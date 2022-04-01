import { useQuery } from "react-query";
import { request, gql } from 'graphql-request';

async function fetchAllotments(user) {
  const endpoint = 'http://127.0.0.1:5000/graphql';
  const variables = {
    username: "Jamil"
  };

  const {
    allotmentsByUser: allotments
  } = await request(
    endpoint,
    gql`
      query allotmentsByUser($username: String!){
        allotmentsByUser(username: $username) {
          name
          hours
          userId
          id
        }
      }
    `,
    variables
  );
  return allotments;
}

fetchAllotments().catch((error) => console.error(error));

export function useAllotments(user) {
  return useQuery('allotments', fetchAllotments);
}
