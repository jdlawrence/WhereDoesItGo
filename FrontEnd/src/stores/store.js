import create from 'zustand';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { devtools } from 'zustand/middleware';

// Usage with a plain action store, it will log actions as "setState"
const useStore = create(devtools(set => ({
  allotments: [
    {
      id: 'aef65402-3595-4cbd-8b33-2271ca29b255',
      name: 'work',
      hours: 45,
    },
    {
      id: '59d1eecf-4176-4ea5-8355-0e53d23bccc5',
      name: 'eating',
      hours: 10.5,
    },
    {
      id: '507f3449-55ae-4170-8e1b-0649f8794da7',
      name: 'exercise',
      hours: 6,
    },
    {
      id: 'd22483dc-c352-4f99-aa4d-4a57de110f28',
      name: 'sleep',
      hours: 56,
    },
    {
      id: 'b8b31591-fecb-426d-8ba7-25a3f2275620',
      name: 'walking',
      hours: 7,
    },
  ],
  setAllotmentHours: (event, id) => {
    set(
      produce(draft => {
        const allotment = draft.allotments.find(allotment => allotment.id === id);
        allotment.hours = event.target.value;
      })
    );
  },
  addAllotment: (name, hours) => {
    set(
      produce(draft => {
        draft.allotments.push({
          id: uuidv4(),
          name,
          hours: parseFloat(hours),
        });
      })
    );
  },

})));

export default useStore;

