import useStore from "../stores/store";

const Allotment = ({ id, name, value }) => {
  const setAllotment = useStore(state => state.setAllotment);
  const handleChange = (id) => (event) => {
    setAllotment(event, id);
  };
  return (
    <div className="border border-blue-500 w-60 grid ">
      <label className="row-span-full">
        {name[0].toUpperCase() + name.substring(1)}:
      </label>
      <input
        className="w-16 border rounded border-stone-500 row-span-full justify-self-end"
        type="number"
        name={name}
        value={value}
        onChange={handleChange(id)}
      />
    </div>
  );
};

export default Allotment;

