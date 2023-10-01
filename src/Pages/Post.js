import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Post = () => {
  return (
    <>
      <div className="flex flex-col w-screen text-center gap-5">
        <div>Specific Post</div>

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
