import useStore from "../stores/store";

const Allotment = ({ id, name, value }) => {
  const setAllotment = useStore(state => state.setAllotment);
  const handleChange = (id) => (event) => {
    setAllotment(event, id);
  };
  return (
    <div>
      <label>
        {name[0].toUpperCase() + name.substring(1)}:
        <input
          type="number"
          name={name}
          value={value}
          onChange={handleChange(id)}
        />
      </label>
    </div>
  );
};

export default Allotment;

