import { useState, useEffect } from "react";
import { realTimeDatabase, storage } from "../firebase/firebase.js";
import { Link } from "react-router-dom";

import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import {
  onChildAdded,
  push,
  ref,
  set,
  onChildRemoved,
  remove,
  get,
  onValue,
  update,
  onChildChanged,
} from "firebase/database";

import "../index.css";

import { FaRegComment, FaRegHeart } from "react-icons/fa6";

import { FeedTicker } from "../Components/FeedTicker/FeedTicker.js";

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = "storedMessages"; //This corresponds to the Firebase RTDB branch/document
const STORAGE_KEY = "images/"; // This corresponds to the Firebase Storage branch/document

export const Feed = () => {
  // Should get information about EACH post here.

  // Q: Should it be passed as props here?
  // Or make the database call here?

  const [messages, setMessages] = useState();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [state, setState] = useState({
    messageText: "",
    fileURL: "",
    likes: 0,
    comments: [],

    userEmail: "",
    userPassword: "",

    currentUID: "",
    isSignedIn: false,

    fileInputFile: null,
    fileInputValue: "",
  });

  useEffect(() => {
    console.log("useEffect Triggered");
    const messagesRef = ref(realTimeDatabase, DB_MESSAGES_KEY);
    console.log(messagesRef);

    // onChildAdded will return data for every child at the reference and every subsequent new child
    // onChildAdded(messagesRef, (data) => {
    //   console.log("hmmm");

    //   // Add the subsequent child to local component state, initialising a new array to trigger re-render
    //   setMessages((prevState) => {
    //     // Store message key so we can use it as a key in our list items when rendering messages
    //     return [...prevState, { key: data.key, val: data.val() }];
    //   });
    // });

    // onChildRemoved(messagesRef, (data) => {
    //   const newRemainingMessages = messages.filter(
    //     (message) => message.key !== data.key
    //   );
    //   setMessages({
    //     messages: newRemainingMessages,
    //   });
    // });

    console.log("initialised messages state is: ", messages);

    return () => {
      console.log("dismounted");
    };
  }, []);

  // only trigger when messages changes.
  // will add in the number of likes and comments later

  // onChildAdded will return data for every child at the reference and every subsequent new child
  // onChildAdded(messagesRef, (data) => {
  //   console.log("hmmm");

  //   // Add the subsequent child to local component state, initialising a new array to trigger re-render
  //   setMessages((prevState) => {
  //     // Store message key so we can use it as a key in our list items when rendering messages
  //     return [...prevState, { key: data.key, val: data.val() }];
  //   });
  // });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user is: ", user);
      console.log("user is signed in, user: ", uid);

      setIsSignedIn(true);
      setCurrentUser(uid);
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

  const writeData = (ev) => {
    ev.preventDefault();
    console.log("writee");
  };

  // On componentDidMount, access database and get the information!
  // useEffect is the equivalent for Functional React Components.

  const messagesTest = [
    {
      userID: "oliver",
      text: "Time for a movie!",
      timestamp: "1 October 2023 9:55pm",
      likes: 12,
      comments: [
        {
          commenterID: "Emily Johnson 🇺🇸",
          commentTimeStamp: "1 October 2023 8:30pm",
          commentLikes: 10,
          commentText: "📸🌟 Fantastic photo!",
        },
        {
          commenterID: "Takeshi Yamamoto 🇯🇵",
          commentTimeStamp: "1 October 2023 9:15pm",
          commentLikes: 8,
          commentText: "🎉🌸 Beautiful composition!",
        },
        {
          commenterID: "Li Wei 🇨🇳",
          commentTimeStamp: "1 October 2023 10:00pm",
          commentLikes: 7,
          commentText: "🍃📷 Lovely shot!",
        },
        {
          commenterID: "Priya Gupta 🇮🇳",
          commentTimeStamp: "1 October 2023 10:45pm",
          commentLikes: 5,
          commentText: "🌞👌 Great capture!",
        },
      ],
      profilePictureUrl:
        "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1948&q=80",
      photoUrl:
        "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=1948&q=80",
    },
    {
      userID: "emily",
      text: "What a wonderful day!",
      timestamp: "1 October 2023 8:02pm",
      likes: 8,
      comments: [
        {
          commenterID: "Michael Brown 🇺🇸",
          commentTimeStamp: "1 October 2023 11:30pm",
          commentLikes: 9,
          commentText: "📸🌇 Spectacular view!",
        },
        {
          commenterID: "Yuki Suzuki 🇯🇵",
          commentTimeStamp: "1 October 2023 11:45pm",
          commentLikes: 12,
          commentText: "👍🌟 Incredible shot!",
        },
      ],
      profilePictureUrl:
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      photoUrl:
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=1974&q=80",
    },
    {
      userID: "charlie",
      text: "Lovely weather!",
      timestamp: "1 October 2023 8:30pm",
      likes: 42,
      comments: [
        {
          commenterID: "Xiao Chen 🇨🇳",
          commentTimeStamp: "2 October 2023 12:15am",
          commentLikes: 15,
          commentText: "🌆📷 Fantastic photography!",
        },
      ],
      profilePictureUrl:
        "https://images.unsplash.com/photo-1621478374422-35206faeddfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      photoUrl:
        "https://images.unsplash.com/photo-1621478374422-35206faeddfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=2070&q=80",
    },
    {
      userID: "lisa",
      text: "Dinner time!",
      timestamp: "1 October 2023 8:50pm",
      likes: 17,
      comments: [
        {
          commenterID: "Aarav Patel 🇮🇳",
          commentTimeStamp: "2 October 2023 12:45am",
          commentLikes: 11,
          commentText: "👏🌄 Great work!",
        },
        {
          commenterID: "Sophia Martinez 🇺🇸",
          commentTimeStamp: "2 October 2023 1:30am",
          commentLikes: 7,
          commentText: "📸🌞 Stunning shot!",
        },
      ],
      profilePictureUrl:
        "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      photoUrl:
        "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=1974&q=80",
    },
    {
      userID: "david",
      text: "Having a blast!",
      timestamp: "1 October 2023 9:12pm",
      likes: 3,
      comments: [
        {
          commenterID: "Kaito Tanaka 🇯🇵",
          commentTimeStamp: "2 October 2023 2:00am",
          commentLikes: 8,
          commentText: "🌇👍 Wonderful photography!",
        },
        {
          commenterID: "Ming Li 🇨🇳",
          commentTimeStamp: "2 October 2023 2:30am",
          commentLikes: 6,
          commentText: "📷🌸 Impressive!",
        },
        {
          commenterID: "Aanya Kapoor 🇮🇳",
          commentTimeStamp: "2 October 2023 3:15am",
          commentLikes: 9,
          commentText: "👌🌄 Fantastic capture!",
        },
        {
          commenterID: "David Smith 🇺🇸",
          commentTimeStamp: "2 October 2023 3:45am",
          commentLikes: 10,
          commentText: "🌞📸 Beautiful photo!",
        },
      ],
      profilePictureUrl:
        "https://images.unsplash.com/photo-1579487685737-e435a87b2518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      photoUrl:
        "https://images.unsplash.com/photo-1579487685737-e435a87b2518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=1974&q=80",
    },
    {
      userID: "sophia",
      text: "Fun evening!",
      timestamp: "1 October 2023 9:30pm",
      likes: 25,
      comments: [
        {
          commenterID: "Sakura Nakamura 🇯🇵",
          commentTimeStamp: "2 October 2023 4:30am",
          commentLikes: 8,
          commentText: "🌸🎉 Wonderful shot!",
        },
        {
          commenterID: "Wei Chen 🇨🇳",
          commentTimeStamp: "2 October 2023 5:00am",
          commentLikes: 7,
          commentText: "🌇📷 Great photography!",
        },
        {
          commenterID: "Rahul Kumar 🇮🇳",
          commentTimeStamp: "2 October 2023 5:30am",
          commentLikes: 5,
          commentText: "👍🌄 Amazing view!",
        },
      ],
      profilePictureUrl:
        "https://images.unsplash.com/photo-1603553329474-99f95f35394f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      photoUrl:
        "https://images.unsplash.com/photo-1603553329474-99f95f35394f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=2069&q=80",
    },
  ];

  // let messageListItems = props.map((message) => <></>);
  let messageListItems = messagesTest.map((message) => (
    <>
      <div
        // key={message.key}
        className="postbubble"
      >
        <div className="flex flex-row justify-between leading-tight pb-[.25rem] px-3">
          <p className="text-sm chatbubbletext text-slate-800 lg:text-[1rem]">
            {message.userEmail === "" ? message.userEmail : "Anonymous"}
          </p>

          <p className="text-sm chatbubbletext text-slate-400 lg:text-[1rem]">
            {message.timestamp}
          </p>
        </div>

        <Link to={`/post/${message.userID}`}>
          <div className="flex flex-row justify-center border-2 border-blue-600 border-solid w-[100%] h-[80%]">
            {/* Need some dynamic linking here */}
            {/* <Link to="/post"> */}
            <img
              src={message.photoUrl}
              alt="default"
              className="w-[100%] h-[100%] object-cover rounded-[3%] border-slate-400 border-[1px] border-solid overflow-hidden"
            />
            {/* </Link> */}
          </div>
        </Link>

        {/* <div className="flex flex-row justify-around"> */}
        {/* <input
            type="button"
            value="Likes"
            className="btn btn-accent btn-sm"
            onClick={console.log("Heloo")}
          /> */}
        {/* <Link to="specific" className="btn btn-accent btn-sm">
            Go to
          </Link> */}

        {/* <FaRegHeart size={30} /> */}

        {/* <FaRegComment size={30} /> */}
        {/* </div> */}

        {/* <h3 className="text-2xl chatbubbletext text-slate-700 border-2 border-solid border-black p-3 leading-tight">
          {message.text}
        </h3> */}

        <div className="flex flex-row justify-around ">
          <div className="flex flex-row w-[50%] justify-center gap-[1rem]">
            <FaRegHeart size={40} />
            <p>{message.likes}</p>
          </div>
          <div className="flex flex-row w-[50%] justify-center gap-[1rem]">
            <FaRegComment size={40} />
            <p>{message.comments.length}</p>
          </div>
        </div>

        <div>
          <form
            onSubmit={writeData}
            className="join justify-center p-[1rem] w-[100%]"
          >
            <input
              type="text"
              name="messageText"
              value={state.messageText}
              onChange={handleTextChange}
              autoComplete="off"
              placeholder="Type Your Comment"
              className="input input-default input-sm min-w-[90%]  text-slate-800 join-item"
            />

            <input
              type="button"
              onClick={writeData}
              className="btn btn-neutral btn-sm join-item rounded-r-xl"
              value="Send"
            />
          </form>
        </div>

        {/* 
          <input
            type="button"
            id={message.key}
            value="Like"
            className="text-sm chatbubbletext bg-red-500 rounded-md shadow-sm pr-2 pl-2 mb-2 mt-2 ml-3"
            onClick={this.handleIncrementLike}
          />

          {this.state.currentUID === message.val.userUID ? (
            <input
              type="button"
              id={message.key}
              value="Delete"
              className="text-sm chatbubbletext bg-slate-300 rounded-md shadow-sm pr-2 pl-2 mb-2 mt-2 ml-3"
              onClick={this.handleDelete}
            />
          ) : null} */}

        {/* Profile Picture */}
        {/* {message.val.fileURL !== "photoURL" ? (
            <img
              src={message.val.fileURL}
              alt=""
              className="w-[2rem] h-[2rem] object-cover rounded-[50%] border-slate-400 border-[1px] border-solid overflow-hidden"
            />
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/rocketgram-ftbc13.appspot.com/o/images%2Fdefaultpic.png?alt=media&token=5ca175aa-98c8-4a4a-8966-8f85160575a7&_gl=1*154w6kf*_ga*OTA4NjcyODY0LjE2OTU1NDU0NjI.*_ga_CW55HF8NVT*MTY5NTg3OTY5MC4yMS4xLjE2OTU4ODQwMTEuMy4wLjA."
              alt="default"
              className="w-[2rem] h-[2rem] object-cover rounded-[50%] border-slate-400 border-[1px] border-solid overflow-hidden"
            />
          )} */}
      </div>
    </>
  ));

  return (
    <>
      <div className="flex flex-row justify-center p-[1rem]">
        <div className="flex flex-col border-solid border-2 border-red-600  ">
          <div className="flex flex-row justify-center border-solid border-2 border-amber-600 py-[.5rem]">
            {isSignedIn === false ? (
              "You are not signed in, there is restricted access"
            ) : (
              <FeedTicker username={currentUser} />
            )}
          </div>

          <div className="flex flex-col-reverse">{messageListItems}</div>
        </div>
      </div>
    </>
  );
};
