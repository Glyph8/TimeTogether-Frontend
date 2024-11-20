import React from "react";
import "./LocationItem.css";

const LocationItem = ({
  locationId,
  locationName,
  url,
  attendanceCount,
  totalMembers,
  isSelected,
  onSelect,
  onDelete,
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
          <button
            className="url-button"
            onClick={() => window.open(url, "_blank")}
          >
            &rsaquo;
          </button>
        </div>
        <button className="delete-button" onClick={onDelete}>
          삭제
        </button>
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

export default LocationItem;
