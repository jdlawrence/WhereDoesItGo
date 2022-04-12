
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="border border-b-2 text-4xl text-slate-100 bg-slate-800 grid justify-items-center">
      <h2 className="">Where Does It Go?? (Your time)</h2>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
        className="text-orange-200 "
      >
        <Link to="/allotments">Allotments</Link> |{" "}
        <Link to="/charts">Charters</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Header;

