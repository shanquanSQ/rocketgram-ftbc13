import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../Util/Auth";

import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Because this component needs to accept a user, we will need to store it in a state. So import useState.
export const CreateAccount = () => {
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState("");

  // const auth = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleLogin = () => {
    console.log("yay");
    // auth.login(user); // this sets the user into the context useAuth(user), i.e. logged in
    // navigate(-1);
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // When this promise runs, the user is Signed Up.
        // userCredential (name is whatever) is a firebase object.
        const user = userCredential.user;

        console.log("user is: ", user);
        console.log("user credentials is: ", userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("error code is: ", errorCode);
        console.log("error message is: ", errorMessage);
      });
  };

  const signInUser = () => {};

  return (
    <>
      <div className="flex flex-row justify-center border-2 border-solid border-red-300 h-[80vh] m-0">
        <div className="flex flex-col justify-center  p-[1rem] border-2 border-solid border-blue-800 ">
          <div>
            <button
              onClick={() => setStatus(!status)}
              className="btn btn-accent btn-sm"
            >
              New User
            </button>
            {status === false ? "status is false" : "status is true"}
          </div>
          {/* Why does functional based/hook based NOT need Value? */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
              <div>
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                  autoComplete="off"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="text"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                  autoComplete="off"
                  className="input input-bordered w-full max-w-xs"
                  // onChange={(ev) => setUser(ev.target.value)}
                />
              </div>
              <div className="text-center mt-[1rem]">
                <input
                  type="button"
                  onClick={createUser}
                  value="Create Account"
                  className="btn btn-sm btn-neutral"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>{user.email}</div>
      <div>{user.password}</div>
    </>
  );
};
