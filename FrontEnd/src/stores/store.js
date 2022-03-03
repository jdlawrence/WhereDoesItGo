import create from 'zustand';
import produce from 'immer';

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
}));

export default useStore;

