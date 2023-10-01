import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Util/Auth";

export const Navbar = () => {
  const auth = useAuth();

  return (
    <nav>
      {/* Navlink accepts an active css when you are at that route */}
      {/* versus using a plain <Link> that only adopt one css */}
      <NavLink to="/">Home</NavLink>
      <NavLink to="/feed">Feed</NavLink>
      <NavLink to="/post">Post</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      {/* {!auth.user && <NavLink to="/login">Log In</NavLink>} */}
    </nav>
  );
};
