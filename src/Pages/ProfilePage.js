import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const ProfilePage = (user) => {
  // const auth = useAuth(user);
  const [isLoggedIn, setIsLoggedIn] = useState("DEFAULT");
  const [currentUser, setCurrentUser] = useState("");

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //Show the User's Profile

      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user is signed in on profile, user: ", uid);
      console.log("on profile, user: ", user);

      const userEmail = user.email;
      setCurrentUser(userEmail);

      // ...
    } else {
      // Show the Login Page
      navigate("/login");
    }
  });

  return (
    <>
      <div>Welcome User:{currentUser}</div>
      <button onClick={() => signOut(auth)} className="btn btn-neutral btn-sm">
        LOG OUT
      </button>
    </>
  );
};
