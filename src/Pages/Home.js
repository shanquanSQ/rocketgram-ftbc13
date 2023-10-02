import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div>Welcome to the home page!</div>
      <div>
        <NavLink to="/feed" className="btn btn-sm btn-active btn-neutral">
          Feed
        </NavLink>
      </div>
    </>
  );
};
