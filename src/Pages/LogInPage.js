import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Util/Auth";

// Because this component needs to accept a user, we will need to store it in a state. So import useState.
export const LogInPage = () => {
  const [user, setUser] = useState("");
  // Note that useAuth is defined as a context variable from App.js
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.login(user); // this sets the user into the context useAuth(user), i.e. logged in
    navigate(-1);
  };

  return (
    <>
      <div>
        <label>Username:</label>
        <input type="text" onChange={(ev) => setUser(ev.target.value)} />
      </div>
      <input type="button" onClick={handleLogin} value="Log In" />
    </>
  );
};
