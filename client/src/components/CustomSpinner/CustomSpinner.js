import React from "react";
import { duckImage } from "./constants/constants";

const CustomSpinner = () => {
  return (
    <div className="spinner-container">
      <img alt="Rubber Duck" src={duckImage} className="spinner"></img>
    </div>
  );
};

export default CustomSpinner;
