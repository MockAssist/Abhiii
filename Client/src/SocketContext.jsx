import { useEffect, createContext, useState, useRef } from "react";

import Peer from "simple-peer";

import { io } from "socket.io-client";
import { message } from "antd";
import { BACKEND_URL } from "../src/Constant";
import { useNavigate } from "react-router-dom";
const SocketContext = createContext();

const socket = io(BACKEND_URL);

const ContextProvider = ({ children }) => {
  const [socketState, setSocketState] = useState(socket);
  const [me, setMe] = useState("");
  const [newMeet, setNewMeet] = useState(false);
  const [call, setCall] = useState({});
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const [otherUserName, setOtherUserName] = useState("");
  const [myVideoStatus, setMyVideoStatus] = useState(true);
  const [userVideoStatus, setUserVideoStatus] = useState(true);
  const [myMicStatus, setMyMicStatus] = useState(false);
  const [userMicStatus, setUserMicStatus] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([]);
  const [notes, setNotes] = useState("");
  const [meetingCode, setMeetingCode] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [quill, setQuill] = useState(null);
  const [otherUserStream, setOtherUserStream] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);

  useEffect(() => {
    socket.on("me", (id) => {
      setMe(id);
    });
    console.log("useffect wala calluser");
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({
        from,
        callerName,
        signal,
        isRecievedCall: true,
      });
      console.log(callerName);
      setOtherUserName(callerName);
      console.log(signal + "askfjifjq");
    });

    socket.on("updateUserMedia", ({ type, mediaStatus }) => {
      if (!type || !mediaStatus || !mediaStatus.length) {
        return;
      }
      if (type === "video") {
        message.info(`User turned ${mediaStatus[0] ? "on" : "off"} his video`);
        setUserVideoStatus(mediaStatus[0]);
        return;
      }
      if (type === "audio") {
        message.info(`User ${mediaStatus[0] ? "unmuted" : "muted"} his mic`);
        setUserMicStatus(mediaStatus[0]);
        return;
      }
      setUserMicStatus(mediaStatus[0]);
      setUserVideoStatus(mediaStatus[1]);
    });

    socket.on("callended", () => {
      setCall(null);
      message.info("User disconnected from call");
      setCallAccepted(false);
      setCallEnded(true);
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    console.log("answer call wala call from");
    console.log(call.from);
    setOtherUser(call.from);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", {
        name,
        signal: data,
        to: call.from,
        type: "both",
        mediaStatus: [myMicStatus, myVideoStatus],
      });
      message.info(`${name} joined with you`);
    });

    peer.on("stream", (currentStream) => {
      setOtherUserStream(currentStream);
    });
    console.log(call);
    console.log("anaswecall fuction");
    console.log(call.signal);
    peer.signal(call.signal);
    console.log("asf");
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    message.info(
      "Calling user... Please wait for the other user to accept the call"
    );
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setOtherUser(id);

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        from: me,
        signal: data,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      setOtherUserStream(currentStream);
    });

    socket.on("callaccepted", (signal, userName) => {
      socket.emit("updateMyMedia", {
        data: {
          type: "both",
          mediaStatus: [myMicStatus, myVideoStatus],
        },
        userToUpdate: id,
      });
      setOtherUserName(userName);
      setCallAccepted(true);
      console.log("user function " + signal);
      peer.signal(signal);
      message.info(`${name} joined with you`);
    });

    connectionRef.current = peer;
  };

  const endCall = () => {
    socket.emit("callended", otherUser);
    setCallEnded(true);
    setCallAccepted(false);
    if (connectionRef.current) connectionRef.current.destroy();

    message.success("Meet Ended");
    //window.location.reload();
    navigate("/");
  };

  const updateVideoStatus = () => {
    socket.emit("updateMyMedia", {
      data: { type: "video", mediaStatus: [!myVideoStatus] },
      userToUpdate: otherUser,
    });

    stream.getVideoTracks()[0].enabled = !myVideoStatus;
    setMyVideoStatus(!myVideoStatus);
  };

  const updateMicStatus = () => {
    socket.emit("updateMyMedia", {
      data: { type: "audio", mediaStatus: [!myMicStatus] },
      userToUpdate: otherUser,
    });

    stream.getAudioTracks()[0].enabled = !myMicStatus;
    setMyMicStatus(!myMicStatus);
  };

  return (
    <SocketContext.Provider
      value={{
        me,
        call,
        callAccepted,
        setCallAccepted,
        callEnded,
        setCallEnded,
        name,
        setName,
        myVideo,
        userVideo,
        stream,
        setStream,
        answerCall,
        callUser,
        endCall,
        otherUser,
        myVideoStatus,
        myMicStatus,
        userVideoStatus,
        userMicStatus,
        setUserVideoStatus,
        updateMicStatus,
        updateVideoStatus,
        setShowEditor,
        showEditor,
        socketState,
        showChatBox,
        setShowChatBox,
        messages,
        setMessages,
        notes,
        setNotes,
        notesOpen,
        setNotesOpen,
        meetingCode,
        setMeetingCode,
        otherUserStream,
        setOtherUserStream,
        newMeet,
        setNewMeet,
        setOtherUser,
        setMyMicStatus,
        setUserMicStatus,
        setMyVideoStatus,
        otherUserName,
        setOtherUserName,
        quill,
        setQuill,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { SocketContext, ContextProvider };
