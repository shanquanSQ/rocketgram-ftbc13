import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Util/Auth.js";

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

function App() {
  return (
    <>
      {/* <AuthProvider> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Feed />} />
        {/* <Route path="feed" element={<Feed />} /> */}
        <Route path="upload" element={<Upload />} />

        <Route path="post/:postkey" element={<Post />}>
          <Route index element={<PostLikes />} />
          <Route path="postLikes" element={<PostLikes />} />
          <Route path="postComments" element={<PostComments />} />
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
