import { useNavigate } from "react-router-dom";
import { useAuth } from "../Util/Auth";
import { NavLink } from "react-router-dom";

export const ProfilePage = (user) => {
  const auth = useAuth(user);
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <>
      <div>Profile Pages</div>
      {console.log(auth)}
      {auth.user === undefined ? (
        <>
          <div>Please Log in!</div>
          {!auth.user && <NavLink to="/login">Log In</NavLink>}
        </>
      ) : (
        <>
          <div>Hi, Welcome {auth.user}</div>
          <input type="button" value="Log Out" onClick={handleLogOut} />
        </>
      )}
      {/* 
      <div>Hi, Welcome {auth.user}</div>
      <input type="button" value="Log Out" onClick={handleLogOut} /> */}
    </>
  );
};
