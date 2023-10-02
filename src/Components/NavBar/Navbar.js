import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Util/Auth";

import { FaSquarePlus, FaUser, FaHouse } from "react-icons/fa6";

export const Navbar = () => {
  const auth = useAuth();

  return (
    <nav>
      {/* Navlink accepts an active css when you are at that route */}
      {/* versus using a plain <Link> that only adopt one css */}
      <NavLink to="/">
        <div>
          <FaHouse size={25} />
        </div>
      </NavLink>
      <NavLink to="/upload">
        <div>
          <FaSquarePlus size={30} />
        </div>
      </NavLink>
      {/* <NavLink to="/feed">Feed</NavLink> */}
      {/* <NavLink to="/post">Post</NavLink> */}
      <NavLink to="/profile">
        <div>
          <FaUser size={25} />
        </div>
      </NavLink>
      {/* {!auth.user && <NavLink to="/login">Log In</NavLink>} */}
    </nav>
  );
};
