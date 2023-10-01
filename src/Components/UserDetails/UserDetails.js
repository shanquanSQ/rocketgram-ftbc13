import { useParams } from "react-router-dom";

export const UserDetails = () => {
  // const params = useParams();
  // const userblabla = params.userID;
  const { userID } = useParams();

  // can probably use userID in params to get backend information specific to user.

  return (
    <>
      <h1>User Details</h1>
      <div>
        <h2>Details about {userID}</h2>
      </div>
    </>
  );
};
