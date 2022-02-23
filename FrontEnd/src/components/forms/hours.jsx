const HOURS_IN_A_WEEK = 168;

import React, { useState, useEffect } from "react";

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
        <label>
          Sleep:
          <input
            type="number"
            name="sleep"
            value={inputs.sleep}
            onChange={handleInput}
          />
        </label>
        <label>
          Work:
          <input
            type="number"
            name="work"
            value={inputs.work}
            onChange={handleInput}
          />
        </label>
      </div>
      <div>
        <label>
          Hours Remaining:
          <span>{timeRemaining}</span>
        </label>
      </div>
    </div>
  );
}
export default Hours;
