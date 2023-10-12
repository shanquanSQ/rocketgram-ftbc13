import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./Util/Auth.js";

import { Navbar } from "./Components/NavBar/Navbar.js";

import { NoMatch } from "./Pages/NoMatch";
// import { Home } from "./Pages/Home";
import { Feed } from "./Pages/Feed";
import { Upload } from "./Pages/UploadPage.js";
import { Post } from "./Pages/Post.js";
import { UsersPage } from "./Pages/UsersPage.js";
import { UserDetails } from "./Components/UserDetails/UserDetails.js";
import { Admin } from "./Pages/AdminPage.js";
import { ProfilePage } from "./Pages/ProfilePage.js";
import { LogInPage } from "./Pages/LogInPage.js";
import { CreateAccount } from "./Pages/CreateAccountPage.js";

import { PostLikes } from "./Components/postLikes/PostLikes.js";
import { PostComments } from "./Components/postComments/PostComments.js";

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = "storedMessages"; //This corresponds to the Firebase RTDB branch/document
const STORAGE_KEY = "images/"; // This corresponds to the Firebase Storage branch/document

function App() {
  return (
    <>
      {/* <AuthProvider> */}
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Feed DB_MESSAGES_KEY={DB_MESSAGES_KEY} STORAGE_KEY={STORAGE_KEY} />
          }
        />
        {/* <Route path="feed" element={<Feed />} /> */}
        <Route path="upload" element={<Upload />} />

        <Route
          path="post/:messagekey"
          element={
            <Post DB_MESSAGES_KEY={DB_MESSAGES_KEY} STORAGE_KEY={STORAGE_KEY} />
          }
        >
          <Route
            index
            element={
              <PostLikes
                DB_MESSAGES_KEY={DB_MESSAGES_KEY}
                STORAGE_KEY={STORAGE_KEY}
              />
            }
          />
          <Route
            path="postLikes"
            element={
              <PostLikes
                DB_MESSAGES_KEY={DB_MESSAGES_KEY}
                STORAGE_KEY={STORAGE_KEY}
              />
            }
          />
          <Route
            path="postComments"
            element={
              <PostComments
                DB_MESSAGES_KEY={DB_MESSAGES_KEY}
                STORAGE_KEY={STORAGE_KEY}
              />
            }
          />
        </Route>

        <Route path="allusers" element={<UsersPage />}>
          {/* dynamic linking with :string, just a variable */}
          <Route path=":userID" element={<UserDetails />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="profile" element={<ProfilePage />} />
        <Route path="login" element={<LogInPage />}>
          <Route path="createaccount" element={<CreateAccount />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
