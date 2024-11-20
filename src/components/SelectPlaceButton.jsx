import React from "react";
import "./SelectPlaceButton.css";

const SelectPlaceButton = ({ onClick, text = "장소 확정하기" }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SelectPlaceButton;
