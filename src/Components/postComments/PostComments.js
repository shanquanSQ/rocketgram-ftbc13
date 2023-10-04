import { useOutletContext } from "react-router-dom";

export const PostComments = () => {
  const [postKey] = useOutletContext();

  return (
    <>
      <div>Comments of specific post</div>
      <p>{postKey}--</p>
    </>
  );
};
