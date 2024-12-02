import React from "react";
import "./TabSelector.css";

const TabSelector = ({ selectedOption, onSelect, meetType }) => {
// const TabSelector = ({ selectedOption, onSelect }) => {
  const options = ["언제", "어디서"]; // 고정된 옵션

  return (
    <div className="tab-selector">
      {options.map((option) => (
        <div
          key={option}
          className={`tab-item ${selectedOption === option ? "active" : ""}`}
          onClick={() => {
            if(meetType === 'ONLINE' && option === '어디서') {
              alert('온라인 회의는 장소를 결정할 수 없습니다.\n오프라인으로 변경해주세요')
            }
            else {
              onSelect(option);
            }
          }
        }
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default TabSelector;
