const HOURS_IN_A_WEEK = 168;

import React, { useState, useEffect } from "react";

const Allotted = ({ allotmentName, allotmentVal, onAllotmentChange }) => {
  return (
    <div>
      <label>
        {allotmentName[0].toUpperCase() + allotmentName.substring(1)}:
        <input
          type="number"
          name={allotmentName}
          value={allotmentVal}
          onChange={onAllotmentChange}
        />
      </label>
    </div>
  );
};

export function Hours() {
  const [inputs, setInputs] = useState({
    sleep: 0,
    work: 0,
  });

  const [timeRemaining, setTimeRemaining] = useState(168);

  function handleInput(e) {
    setInputs({...inputs, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setTimeRemaining(HOURS_IN_A_WEEK
      - parseInt(inputs.sleep)
      - parseInt(inputs.work)
    );
  }, [inputs]);

  return (
    <div>
      <div>
        <Allotted
          allotmentName="sleep"
          allotmentVal={inputs.sleep}
          onAllotmentChange={handleInput}
        />
        <Allotted
          allotmentName="work"
          allotmentVal={inputs.work}
          onAllotmentChange={handleInput}
        />
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
