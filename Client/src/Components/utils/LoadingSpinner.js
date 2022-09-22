import React from "react";
import "./LineWaveLoader.css";
const LoadingSpinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000000000,
      }}
    >
      <div
        style={{
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
        loading .... Please wait
      </div>
    </div>
  );
};

export default LoadingSpinner;
