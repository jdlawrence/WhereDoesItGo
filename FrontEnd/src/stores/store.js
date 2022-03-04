import create from 'zustand';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';


const useStore = create(set => ({
  allotments: [
    {
      id: 'd22483dc-c352-4f99-aa4d-4a57de110f28',
      name: 'sleep',
      hours: 0,
    },
    {
      id: 'aef65402-3595-4cbd-8b33-2271ca29b255',
      name: 'work',
      hours: 0,
    },
  ],
  setAllotment: (event, id) => {
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
          hours: parseInt(hours),
        });
      })
    );
  },

}));

export default useStore;

