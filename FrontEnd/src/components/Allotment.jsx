import useStore from "../stores/store";

const Allotment = ({ id, name, value }) => {
  const setAllotment = useStore(state => state.setAllotment);
  const handleChange = (id) => (event) => {
    setAllotment(event, id);
  };
  return (
    <div className="shadow-md shadow-slate-800 rounded mb-2 w-80 grid bg-slate-700 text-slate-100 p-1.5 ">
      <label className="row-span-full">
        {name[0].toUpperCase() + name.substring(1)}:
      </label>
      <input
        className="w-16 border rounded border-stone-500 row-span-full justify-self-end text-slate-700 text-center"
        type="number"
        name={name}
        value={value}
        onChange={handleChange(id)}
      />
    </div>
  );
};

export default Allotment;

