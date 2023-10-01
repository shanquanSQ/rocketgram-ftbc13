import { Outlet, useSearchParams } from "react-router-dom";
// useSearchParams is similar to useState hook from react; But it stores data in URL instead of state.

export const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showActiveUsers = searchParams.get("filter") === "active"; // what does GET mean

  return (
    <>
      <div>
        <h2>User 1</h2>
        <h2>User 2</h2>
        <h2>User 3</h2>
      </div>
      <Outlet />
      <div>
        <input
          type="button"
          value="Active Users"
          onClick={() => setSearchParams({ filter: "active" })} //custom stuff you want to write into the URL. { AA : BB } will appear as ?AA=BB
          className="border-2 p-1 border-slate-800"
        />
        <input
          type="button"
          value="Reset Filter"
          onClick={() => setSearchParams({})}
          className="border-2 p-1 border-slate-800"
        />
      </div>
      {showActiveUsers ? (
        <h1>Showing Active Users</h1>
      ) : (
        <h1>Deactivating - search params is empty</h1>
      )}
    </>
  );
};
