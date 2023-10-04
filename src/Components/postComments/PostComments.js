import { useOutletContext } from "react-router-dom";

export const PostComments = ({ DB_MESSAGES_KEY, STORAGE_KEY }) => {
  const [postKey] = useOutletContext();

  return (
    <>
      <div>Comments of specific post</div>
      <p>{postKey}--</p>
    </>
  );
};
