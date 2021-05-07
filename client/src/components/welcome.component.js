import React from "react";

const Landing = () => {
  return (
    <div>
      <div className="main isCentered">
        <h1 className="main__title">Organizing Easier</h1>
        <h1 style={{ fontSize: "50px" }}>
          Improve Your <span className="green__text">Productivity</span>
        </h1>
        <a href="get-started" className="btn__outline">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Landing;
