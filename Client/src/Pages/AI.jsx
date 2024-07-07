// Example: src/components/ChatbotIframe.js
import React from "react";
import Navbar from "../Components/Navbar";
const chatBot = () => {
  return (
    <>
      <Navbar />
      <div className="chatbot-container">
        <iframe
          src="https://cleverchatter.vercel.app/" // Replace with your deployed chatbot URL
          title="Chatbot"
          width="100%"
          height="700px"
          style={{ border: "none" }}
        />
      </div>
    </>
  );
};

export default chatBot;
