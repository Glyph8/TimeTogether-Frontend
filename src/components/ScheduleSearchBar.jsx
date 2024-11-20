import React from "react";
import "./ScheduleSearchBar.css";

const ScheduleSearchBar = ({ placeholder, onChange, value, iconSrc }) => {
  return (
    <div className="schedule-search-bar">
      <img src={iconSrc} alt="Search Icon" className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "키워드로 검색할 수 있어요!"}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default ScheduleSearchBar;
