import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom"; // takes Params from the URL

import { get, ref } from "firebase/database";
import { realTimeDatabase } from "../firebase/firebase.js";
import { useEffect, useState } from "react";

//this page should be lazy loaded

export const Post = ({ DB_MESSAGES_KEY, STORAGE_KEY }) => {
  // Use this state to obtain and store Firebase RTDB info
  const [postInfo, setPostInfo] = useState({});

  // the key will be what is specified in the Router (in App.js)
  // const { postkey } = useParams();
  const params = useParams();
  const messageKey = params.messagekey;

  // API call to Firebase RTDB for the specific branch (one branch is one message/post)
  useEffect(() => {
    console.log("on mount");
    // const messagesRef = ref(realTimeDatabase, DB_MESSAGES_KEY);

    const specificPost = ref(
      realTimeDatabase,
      `${DB_MESSAGES_KEY}/${messageKey}`
    );

    get(specificPost).then((snapshot) => {
      const data = snapshot.val();
      console.log(snapshot.val());

      setPostInfo(snapshot.val());
    });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center p-[2rem]">
        <div className="flex flex-col w-screen text-center gap-5">
          <div>Firebase Child Key is {messageKey} </div>
          <div>The userUID is {postInfo.userUID}</div>

          <div className="p-[1rem] bg-slate-300 rounded-xl">
            Caption:
            <div>{postInfo.text}</div>
          </div>

          <div className="flex flex-row justify-center gap-3">
            <Link to="postComments" className="bg-slate-400">
              Comments
            </Link>

            <Link to="postLikes" className="bg-red-400">
              Likes
            </Link>
          </div>
          <Outlet context={[messageKey]} />
        </div>
      </div>
    </>
  );
};
