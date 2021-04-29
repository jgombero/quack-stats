import React from "react";
import { duckImage } from "./constants/constants";

const CustomSpinner = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75vh" }}
    >
      <img alt="Rubber Duck" src={duckImage} className="spinner"></img>
    </div>
  );
};

export default CustomSpinner;
