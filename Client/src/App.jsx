// App.js
import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Github from "./Pages/Github";
import Home from "./Pages/Home";
import Join from "./Pages/Join";
import Meet from "./Pages/Meet";
import AI from "./Pages/AI";
import { ContextProvider } from "./SocketContext";

function App() {
  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, []);

  return (
    <Router>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/meet" element={<Meet />} />
          <Route path="/github" element={<Github />} />
          <Route path="/ai" element={<AI />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
