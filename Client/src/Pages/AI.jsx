import React from "react";
import Navbar from "../Components/Navbar";
import Controller from "../Components/Controller";
function AI() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Controller />
        <div className="stepcontainer">
          <h1>AI page</h1>
        </div>
      </div>
    </>
  );
}

export default AI;