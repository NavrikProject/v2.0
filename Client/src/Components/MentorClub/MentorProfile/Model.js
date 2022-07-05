import React from "react";
import "./Model.css";

const Model = ({ children }) => {
  return (
    <div className="backdrop">
      <div className="modal">{children}</div>
    </div>
  );
};

export default Model;
