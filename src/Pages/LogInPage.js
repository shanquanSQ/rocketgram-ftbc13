import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Util/Auth.js";

import { auth } from "../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

// Because this component needs to accept a user, we will need to store it in a state. So import useState.
export const LogInPage = () => {
  const [status, setStatus] = useState("NEWUSER");
  const [user, setUser] = useState("");

  const authUser = useAuth();

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
    // useAuth().login(user);  // Why does this not work?
    authUser.login(user);
    navigate("/");
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // When this promise runs, the user is Signed Up.
        // userCredential (name is whatever) is a firebase object.
        const user = userCredential.user;

        console.log("user is: ", user);
        console.log("user credentials is: ", userCredential);

        console.log(user.uid);

        console.log("Create user successful!");
        console.log("Signing In Initiating");
        signInUser();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("error code is: ", errorCode);
        console.log("error message is: ", errorMessage);
      });
  };

  const signInUser = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() =>
        signInWithEmailAndPassword(auth, user.email, user.password).then(
          (userCredential) => {
            const user = userCredential.user;
            // pass this user to Global Variable Context
            navigate("/");
            // handleLogin();
          }
        )
      )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("sign in error code is: ", errorCode);
        console.log("sign in error message is: ", errorMessage);
      });
  };

  return (
    <>
      <div className="flex flex-row justify-center border-2 border-solid border-red-300 h-[80vh] m-0">
        <div className="flex flex-col justify-center  p-[1rem] border-2 border-solid border-blue-800 ">
          <div className=" flex flex-row justify-around border-2 border-solid border-amber-600 pb-[3rem]">
            {/* <Link to="createaccount" className="btn btn-default btn-sm">
              New User{" "}
            </Link>
            <Link to="createaccount" className="btn btn-accent btn-sm">
              Sign In{" "}
            </Link> */}

            <button
              onClick={() => setStatus("NEWUSER")}
              className="btn btn-neutral btn-sm"
            >
              New User
            </button>
            <button
              onClick={() => setStatus("SIGNIN")}
              className="btn btn-accent btn-sm"
            >
              SIGN IN{" "}
            </button>
          </div>

          {status === "NEWUSER" ? (
            <>
              {" "}
              {/* Why does functional based/hook based NOT need Value? */}
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[1rem]"
                >
                  <div>
                    <label>Email:</label>
                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={user.email}
                      autoComplete="off"
                      placeholder="Insert your email"
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
                      placeholder="Insert a password"
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
            </>
          ) : (
            <>
              {" "}
              {/* Why does functional based/hook based NOT need Value? */}
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[1rem]"
                >
                  <div>
                    <label>Email:</label>
                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={user.email}
                      autoComplete="off"
                      placeholder="Insert your registered email"
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
                      placeholder="Insert your passsword"
                      className="input input-bordered w-full max-w-xs"
                      // onChange={(ev) => setUser(ev.target.value)}
                    />
                  </div>
                  <div className="text-center mt-[1rem]">
                    <input
                      type="button"
                      onClick={signInUser}
                      value="SIGN IN"
                      className="btn btn-sm btn-accent"
                    />
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <div>{user.email}</div>
      <div>{user.password}</div>
    </>
  );
};
