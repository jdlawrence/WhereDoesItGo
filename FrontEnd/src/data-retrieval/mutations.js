import { useMutation } from "react-query";
import { request, gql } from 'graphql-request';

async function addAllotment({ username, name, hours, idUuid }) {
  const endpoint = 'http://127.0.0.1:5000/graphql';
  const variables = {
    input: {
      username,
      name,
      hours,
      idUuid
    }
  };

  const {
    allotmentsByUser: allotments
  } = await request(
    endpoint,
    gql`
      mutation addAllotment($input: AddAllotmentInput!) {
        addAllotment(addAllotmentInput: $input) {
            payload{
                user{
                    username
                    email
                }
                allotment {
                    name
                    hours
                    idUuid
                }
            }
        }
      }
    `,
    variables
  );
  return allotments;
}

export function useAddAllotment(useMutationOptions) {
  return useMutation(addAllotment, {
    ...useMutationOptions
  });
}