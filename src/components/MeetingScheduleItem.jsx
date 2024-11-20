import React from "react";
import "./MeetingScheduleItem.css";
import axios from "axios";

const MeetingScheduleItem = ({ meeting, groupId }) => {
  const { meetDTstart, meetDTend, meetType, locationName } = meeting;

  return (
    <div className="meeting-item">
      <div className="meeting-header">
        <div
          className={`meeting-status ${
            meetType === "온라인" ? "online" : "offline"
          }`}
        >
          {meetType}
        </div>

        <div className="meeting-time">
          {new Date(meetDTstart).toLocaleDateString("ko-KR", {
            month: "2-digit",
            day: "2-digit",
            weekday: "short",
          })}{" "}
          {new Date(meetDTstart).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          ~{" "}
          {new Date(meetDTend).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      {locationName && <div className="meeting-location">{locationName}</div>}
    </div>
  );
};

export default MeetingScheduleItem;
