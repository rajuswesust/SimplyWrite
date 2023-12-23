import React from "react";
import CustomNavBar from "./CustomNavbar";

const Base = ({ title = "Welcome Namai Mathu", children }) => {
  return (
    <div className="">
      <CustomNavBar />
      {children}
      <h1>Footer</h1>
    </div>
  );
};

export default Base;
