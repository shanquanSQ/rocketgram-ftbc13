import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { push, ref, set } from "firebase/database";

import { realTimeDatabase, storage } from "../firebase/firebase.js";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

// This should be a protected route - requires user Auth

const DB_MESSAGES_KEY = "storedMessages"; //This corresponds to the Firebase branch/document
const STORAGE_KEY = "images/"; // This corresponds to the Firebase branch/document

export const Upload = () => {
  // const [messages, setMessages] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const [userLoggedInEmail, setUserLoggedInEmail] = useState("");

  const [uploadedFile, setUploadFile] = useState({
    fileInputFile: null,
  });

  const [state, setState] = useState({
    messageText: "",
    fileURL: "",
    likes: 0,
    comments: [],

    currentUID: "",
    isSignedIn: false,
  });

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      // console.log("user UID is: ", uid);
      // console.log("user email is: ", user.email);
      setUserLoggedInEmail(user.email);
      setUserLoggedIn(uid);
    } else {
      console.log("user is signed out");
    }
  });

  const handleTextChange = (ev) => {
    let { name, value } = ev.target;

    setState({
      [name]: value,
    });
  };

  // functions to push to Database
  const writeData = (photoURL) => {
    // ev.preventDefault();
    console.log("writee");

    if (state.messageText !== "") {
      const messageListRef = ref(realTimeDatabase, DB_MESSAGES_KEY);
      const newMessageRef = push(messageListRef);
      // Sets a key - assigned by Firebase - for a NEW branch in Firebase

      // Need to seperate per user, give it an ID and create a new item in the list
      set(newMessageRef, {
        text: state.messageText,
        timestamp: new Date().toTimeString(),
        fileURL: photoURL,

        likes: 0,
        comments: [" "],

        userUID: userLoggedIn,
        userEmail: userLoggedInEmail,
      });

      navigate("/");
    } else {
      alert("You need to enter a caption as well!");
    }
  };

  const submitData = () => {
    // Create a reference to the full path of the file. This path will be used to upload to Firebase Storage
    if (
      uploadedFile.fileInputFile === undefined ||
      uploadedFile.fileInputFile === null
    ) {
      alert("You need to upload a picture!");
    } else {
      const storageRef = sRef(
        storage,
        STORAGE_KEY + uploadedFile.fileInputFile.name
      );

      // console.log(uploadedFile.fileInputFile.name);

      uploadBytes(storageRef, uploadedFile.fileInputFile).then((snapshot) => {
        console.log("uploaded a file!");
        getDownloadURL(storageRef, uploadedFile.fileInputFile.name).then(
          (fileUrl) => writeData(fileUrl)
        );
      });
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-center border-2 border-solid border-red-300 h-[80vh] m-0">
          <div className="flex flex-col justify-center text-center p-[1rem] border-2 border-solid border-red-800">
            <div className="flex flex-col justify-center w-[100%] h-[100%] bg-slate-300 rounded-[3%] overflow-hidden">
              {uploadedFile.fileInputFile === null ||
              uploadedFile.fileInputFile === undefined ? (
                <h1>Make a Snap!</h1>
              ) : (
                <img
                  src={URL.createObjectURL(uploadedFile.fileInputFile)}
                  alt={URL.createObjectURL(
                    uploadedFile.fileInputFile
                  ).toString()}
                  className="w-[100%] h-[100%] object-cover"
                />
              )}
            </div>

            <div>
              <form
                onSubmit={writeData}
                className="join justify-center p-[1rem]"
              >
                <input
                  type="text"
                  name="messageText"
                  value={state.messageText}
                  onChange={handleTextChange}
                  autoComplete="off"
                  placeholder="Caption"
                  className="input input-default input-sm min-w-[100%]  text-slate-800 join-item"
                />

                {/* UPLOAD FILE BUTTON */}
                <input
                  type="button"
                  onClick={submitData}
                  className="btn btn-primary btn-sm join-item rounded-r-xl"
                  value="POST"
                />
              </form>

              <form>
                {/* some kind of pre-processing is already done, so fileInputValue doesnt need to be */}
                <input
                  type="file"
                  name="fileUpload"
                  value={uploadedFile.fileInputValue}
                  onChange={(ev) => {
                    // console.log(ev.target.files);
                    setUploadFile({
                      fileInputFile: ev.target.files[0],
                      fileInputValue: ev.target.fileUpload,
                    });
                  }}
                  className="file-input file-input-bordered file w-full max-w-xs "
                />
              </form>
            </div>
          </div>
        </div>
        <div className="border-2 border-amber-500 border-solid text-center py-[0.5rem]">
          {userLoggedIn === ""
            ? "You are not logged in! You will have restricted access, and your posts can be deleted by anyone!"
            : `You are posting as ${userLoggedIn}. You will be able to delete your own posts.`}
        </div>
      </div>
    </>
  );
};
