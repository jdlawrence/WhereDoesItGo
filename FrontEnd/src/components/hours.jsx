import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { v4 as uuidv4 } from 'uuid';
import { useAddAllotment, useDeleteAllotment } from "../data-retrieval/mutations";
import { useAllotments } from "../data-retrieval/queries";
import Allotment from "./Allotment";

const HOURS_IN_A_WEEK = 168;

function Hours() {
  const { status, data: allotments, error, isFetching } = useAllotments();
  // const { mutate: addAllotment } = useAddAllotment({ onMutate: handleSuccessfulAdd });
  const [ addAllotment ] = useAddAllotment({ onMutate: handleSuccessfulAdd });
  const { mutate: deleteAllotment } = useDeleteAllotment({ onMutate: handleSuccessfulDeletion });
  const queryClient = useQueryClient();


  async function handleSuccessfulAdd(newAllotment) {
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries('allotments');

    // Snapshot the previous value
    const previousAllotments = queryClient.getQueryData('allotments');

    // Optimistically update to the new value
    queryClient.setQueryData('allotments', old => [...old, newAllotment]);

    // Return a context object with the snapshotted value
    return { previousAllotments };
  }

  async function handleSuccessfulDeletion({ idUuid }) {
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries('allotments');

    // Snapshot the previous value
    const previous = queryClient.getQueryData('allotments');

    // Optimistically update to the new value
    queryClient.setQueryData('allotments', old => old.filter(item => item.idUuid != idUuid));

    // Return a context object with the snapshotted value
    return { previous };
  }

  const sortedAllotments = allotments ? [...allotments,].sort((a, b) => b.hours - a.hours) : [];

  const [values, setValues] = useState({
    category: '',
    categoryHours: 0,
  });

  const handleCategoryChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addAllotment({
      username: 'Jamil',
      name: values.category,
      hours: values.categoryHours,
      idUuid: uuidv4()
    });
  };

  const [timeRemaining, setTimeRemaining] = useState(HOURS_IN_A_WEEK);

  useEffect(() => {
    const allotmentsSum = allotments ?
      allotments.reduce((prev, curr) => prev + parseFloat(curr.hours), 0) :
      0;

    setTimeRemaining(HOURS_IN_A_WEEK - allotmentsSum);
  });

  return (
    <div>
      <div className="mt-2">
        {sortedAllotments.map(allotment => (
          <div
            className="grid place-items-center"
            key={allotment.idUuid}
          >
            <Allotment
              deleteAllotment={deleteAllotment}
              id={allotment.idUuid}
              name={allotment.name}
              value={allotment.hours}
            />
          </div>
        ))}
      </div>
      <div>
        <label>
          Weekly Hours Remaining:
          <span>{timeRemaining}</span>
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={values.category}
          onChange={handleCategoryChange} />
        <label>Hours:</label>
        <input
          type="number"
          placeholder="Hours"
          name="categoryHours"
          value={values.categoryHours}
          onChange={handleCategoryChange} />
        <button className="border ml-2" type="submit">Add to Allotment</button>
      </form>
    </div>
  );
}
export default Hours;
