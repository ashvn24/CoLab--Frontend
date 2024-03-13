import React from "react";
import Dashboard from "../../../Components/User/Dashboard";
import YtStats from "../../../Components/User/YtStats";

const CreatorHome = () => {
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-post">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home</h2>
          <Dashboard />
          <YtStats/>
        </div>
      </div>
    </div>
  );
};

export default CreatorHome;
