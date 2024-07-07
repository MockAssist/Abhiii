// Example: src/components/ChatbotIframe.js
import React from 'react';

const chatBot = () => {
  return (
    <div className="chatbot-container">
      <iframe
        src="https://cleverchatter.vercel.app/" // Replace with your deployed chatbot URL
        title="Chatbot"
        width="100%"
        height="500px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default chatBot;
