import React, { useState, useEffect } from "react";
import useStore from "../stores/store";
import Allotment from "./Allotment";

const HOURS_IN_A_WEEK = 168;



export function Hours() {
  let allotments = useStore(state => state.allotments);
  const addAllotment = useStore(state => state.addAllotment);

  let sortedAllotments = [...allotments].sort((a, b) => b.hours - a.hours);

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
    addAllotment(values.category, values.categoryHours);
  };

  const [timeRemaining, setTimeRemaining] = useState(HOURS_IN_A_WEEK);

  useEffect(() => {
    const allotmentsSum = allotments
      .reduce((prev, curr) => prev + parseFloat(curr.hours), 0);

    setTimeRemaining(HOURS_IN_A_WEEK - allotmentsSum);
  });

  return (
    <div>
      <div className="mt-2">
        {sortedAllotments.map(allotment => (
          <div
            className="grid place-items-center"
            key={allotment.id}
          >
            <Allotment
              name={allotment.name}
              value={allotment.hours}
              id={allotment.id}
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
