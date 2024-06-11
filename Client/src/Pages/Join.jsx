import React from "react";
import "../Components/init";
import { useContext, useEffect, useRef, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../SocketContext";
import { message } from "antd";

import "../Styles/join.css";

import Spinner from "../Components/Spinner";
import Navbar from "../Components/Navbar";
import { responsiveArray } from "antd/es/_util/responsiveObserver";

const Join = () => {
  const {
    callAccepted,
    name,
    setName,
    stream,
    setStream,
    callUser,
    meetingCode,
    setMeetingCode,
    newMeet,
  } = useContext(SocketContext);

  const myVideo = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newMeet && meetingCode.length === 0) {
      console.log("fkjsdfjhsdjh");
      navigate("/");
      window.location.reload();
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        if (myVideo.current) {
          // do something
          myVideo.current.srcObject = res;
        }
      });
  }, []);

  useEffect(() => {
    if (callAccepted) navigate("/meet");
  }, [callAccepted]);

  return (
    <>
      <Navbar />
      <div className="joinpage pt-4 flex items-center justify-center p-6 bg-[#211951]">
        <div>
          <div className="video-div w-full">
            {stream ? (
              <video
                width="250"
                height="140"
                src=""
                ref={myVideo}
                autoPlay
                muted
              ></video>
            ) : (
              <Spinner />
            )}
          </div>
          {stream && (
            <div>
              <input
                className="w-96 px-4 py-3  mt-10 mb-2 rounded-lg box-border  pt-3 text-black"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="join-btns-div">
                {newMeet ? (
                  <button
                    className="btn  w-40 rounded-xl font-bold uppercase  hover:bg-white hover:text-black p-4 bg-[#7E30E1] m-5"
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error("Please enter your name");
                        return;
                      }
                      navigate("/meet");
                    }}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="btn  w-40 rounded-xl font-bold uppercase  hover:bg-white hover:text-black p-4 bg-[#7E30E1] m-5"
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error("Please enter your name");
                        return;
                      }
                      console.log("Join now button clicked"); // Add this console log
                      console.log(meetingCode);
                      callUser(meetingCode);
                    }}
                  >
                    Join now
                  </button>
                )}
                <button
                  className="btn  w-40 rounded-xl font-bold uppercase  hover:bg-white hover:text-black p-4 bg-[#7E30E1] m-5"
                  onClick={() => {
                    setMeetingCode("");
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Join;
