import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { realTimeDatabase, storage } from "../firebase/firebase.js";

import { NavLink } from "react-router-dom";
import { useState } from "react";

// This should be a protected route.

const DB_MESSAGES_KEY = "storedMessages"; //This corresponds to the Firebase branch/document
const STORAGE_KEY = "images/"; // This corresponds to the Firebase branch/document

export const Upload = () => {
  const [messages, setMessages] = useState();

  const [uploadedFile, setUploadFile] = useState({
    fileInputFile: null,
  });

  const [state, setState] = useState({
    messageText: "",
    fileURL: "",
    likes: 0,
    comments: [],

    userEmail: "",
    userPassword: "",

    currentUID: "",
    isSignedIn: false,
  });

  const handleTextChange = (ev) => {
    let { name, value } = ev.target;

    setState({
      [name]: value,
    });
  };

  // functions to push to Database
  const writeData = (ev) => {
    ev.preventDefault();
    console.log("writee");
  };

  const uploadPost = (ev) => {
    ev.preventDefault();
    console.log("UPLOADING POST");
  };

  const submitData = () => {
    // Create a reference to the full path of the file. This path will be used to upload to Firebase Storage
    const storageRef = sRef(
      storage,
      STORAGE_KEY + uploadedFile.fileInputFile.name
    );

    console.log(uploadedFile.fileInputFile.name);

    uploadBytes(storageRef, uploadedFile.fileInputFile).then((snapshot) => {
      console.log("uploaded a file!");
      getDownloadURL(storageRef, uploadedFile.fileInputFile.name).then(
        (fileUrl) => writeData(fileUrl)
      );
    });
  };

  return (
    <>
      <div className="flex flex-row justify-center border-2 border-solid border-red-300 h-[80vh] m-0">
        <div className="flex flex-col justify-center text-center p-[1rem] border-2 border-solid border-red-800">
          <div className="flex flex-col justify-center w-[100%] h-[100%] bg-slate-300 rounded-[3%] overflow-hidden">
            {uploadedFile.fileInputFile === null ? (
              <h1>Make a Snap!</h1>
            ) : (
              <img
                src={URL.createObjectURL(uploadedFile.fileInputFile)}
                alt="preview"
                className="w-[100%] h-[100%] object-cover"
              />
            )}
          </div>

          {/* <div>
            {uploadedFile.fileInputValue === null
              ? "true"
              : console.log(uploadedFile.fileInputFile)}
          </div> */}

          <div>
            <form onSubmit={writeData} className="join justify-center p-[1rem]">
              <input
                type="text"
                name="messageText"
                value={state.messageText}
                onChange={handleTextChange}
                autoComplete="off"
                placeholder="Caption"
                className="input input-default input-sm min-w-[100%]  text-slate-800 join-item"
              />

              <input
                type="button"
                onClick={() => {
                  console.log(uploadedFile.fileInputFile);
                }}
                className="btn btn-neutral btn-sm join-item rounded-r-xl"
                value="Send"
              />
            </form>

            <form onSubmit={uploadPost}>
              {/* some kind of pre-processing is already done, so fileInputValue doesnt need to be */}
              <input
                type="file"
                name="fileUpload"
                value={uploadedFile.fileInputValue}
                onChange={(ev) => {
                  console.log(ev.target.files);
                  // cant change fileInputValue to fileInputFile??? Throws error.
                  setUploadFile({
                    fileInputFile: ev.target.files[0],
                    fileInputValue: ev.target.fileUpload,
                    //not sure why fileInputValue: ev.target.files[0].name cant work.
                  });
                }}
                className="file-input file-input-bordered file w-full max-w-xs"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
