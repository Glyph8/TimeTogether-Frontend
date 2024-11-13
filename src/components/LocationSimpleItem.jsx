import React from "react";
import "./LocationSimpleItem.css";

const LocationSimpleItem = ({
  locationId,
  locationName,
  attendanceCount,
  totalMembers,
  isSelected,
  onSelect,
}) => {
  return (
    <li className="location-item">
      <div className="location-info">
        <div className="location-main">
          <span className="attendance-count">
            <span style={{ fontWeight: "bold" }}>{attendanceCount}</span>/
            {totalMembers}
          </span>
          <span className="location-name">{locationName}</span>
        </div>
      </div>
      <div className="location-actions">
        <button
          className={`selection-button ${isSelected ? "selected" : ""}`}
          onClick={onSelect}
        >
          <span>&#10003;</span>
        </button>
      </div>
    </li>
  );
};

export default LocationSimpleItem;
