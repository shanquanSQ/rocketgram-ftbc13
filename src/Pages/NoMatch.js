import { useNavigate } from "react-router-dom";

export const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>No Match, Error</div>
      <input
        type="button"
        value="Go Back"
        // Not sure why onClick = {navigate(-1)} doesnt work, and I need to have an arrow function. Isn't navigate already a function?
        // I can't use useNavigate directly as well.
        onClick={() => navigate(-1)}
        className="bg-slate-400"
      />
    </>
  );
};
