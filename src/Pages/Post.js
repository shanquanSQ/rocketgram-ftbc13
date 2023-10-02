import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom"; // takes Params from the URL

import { useState } from "react";

//this page should be lazy loaded

export const Post = () => {
  // Use this state to obtain and store Firebase RTDB info
  const [branch, setBranch] = useState();

  // API call to Firebase RTDB for the specific branch (one branch is one message/post)

  // the key will be what is specified in the Router (in App.js)
  // const { postkey } = useParams();
  const params = useParams();
  const postKey = params.postkey;

  return (
    <>
      <div className="flex flex-col w-screen text-center gap-5">
        <div>Specific Post of {postKey} </div>

        <div className="flex flex-row justify-center gap-3">
          <Link to="postComments" className="bg-slate-400">
            Comments
          </Link>

          <Link to="postLikes" className="bg-red-400">
            Likes
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
};
