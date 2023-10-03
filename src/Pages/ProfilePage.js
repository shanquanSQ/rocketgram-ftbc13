import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Util/Auth";
import { NavLink } from "react-router-dom";

import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export const ProfilePage = (user) => {
  // const auth = useAuth(user);
  const navigate = useNavigate();

  // const handleLogOut = () => {
  //   auth.logout();
  //   navigate("/");
  // };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user is signed in on profile, user: ", uid);
      console.log("on profile, user: ", user);
      // ...
    } else {
      console.log("user is signed out on profile");
    }
  });

  return (
    <>
      <div>Profile Pages</div>

      {/* {console.log(auth)} */}
      {/* {auth.user === undefined ? (
        <>
          <div>Please Log in!</div>
          {!auth.user && <NavLink to="/login">Log In</NavLink>}
        </>
      ) : (
        <>
          <div>Hi, Welcome {auth.user}</div>
          <input type="button" value="Log Out" onClick={handleLogOut} />
        </>
      )} */}
      {/* 
      <div>Hi, Welcome {auth.user}</div>
      <input type="button" value="Log Out" onClick={handleLogOut} /> */}
    </>
  );
};
