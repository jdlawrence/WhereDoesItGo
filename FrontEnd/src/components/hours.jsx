import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import useStore from "../stores/store";
import Allotment from "./Allotment";

const HOURS_IN_A_WEEK = 168;



export function Hours() {
  let allotments = useStore(state => state.allotments);

  const [timeRemaining, setTimeRemaining] = useState(HOURS_IN_A_WEEK);

  useEffect(() => {
    const allotmentsSum = allotments
      .reduce((prev, curr) => parseInt(prev.hours) + parseInt(curr.hours));

    setTimeRemaining(HOURS_IN_A_WEEK - allotmentsSum);
  });

  return (
    <div>
      <div>
        {allotments.map(allotment => (
          <Allotment
            key={allotment.id}
            name={allotment.name}
            value={allotment.hours}
            id={allotment.id}
          />
        ))}
      </div>
      <div>
        <label>
          Weekly Hours Remaining:
          <span>{timeRemaining}</span>
        </label>
      </div>
    </div>
  );
}
export default Hours;
