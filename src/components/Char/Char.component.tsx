import React from "react";
import "./style.css";

interface CharProps {}

const charComponent: React.FC<CharProps> = (props) => {
  return (
    <div>
      <h1>Char</h1>
      <div className="char"></div>
    </div>
  );
};

export default charComponent;
