import React from "react";
import "./TabSelector.css";

const TabSelector = ({ selectedOption, onSelect }) => {
  const options = ["언제", "어디서"]; // 고정된 옵션

  return (
    <div className="tab-selector">
      {options.map((option) => (
        <div
          key={option}
          className={`tab-item ${selectedOption === option ? "active" : ""}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default TabSelector;
