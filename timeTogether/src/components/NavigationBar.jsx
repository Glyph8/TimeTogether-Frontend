import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css"; // 스타일 파일 import
import group from "../img/icon/group.png"; //이미지 파일
import groupS from "../img/icon/groupSelect.png";
import calendar from "../img/icon/calendar.png";
import calendarS from "../img/icon/calendarSelect.png";
import schedule from "../img/icon/schedule.png";
import scheduleS from "../img/icon/scheduleSelect.png";
import my from "../img/icon/mypage.png";
import myS from "../img/icon/mypageSelect.png";

function NavigationBar() {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link
        to="/calendar"
        className={`nav-item ${
          location.pathname === "/calendar" ? "active" : ""
        }`}
      >
        <img
          className="icon"
          src={location.pathname === "/calendar" ? calendarS : calendar}
          alt="calendar"
          width="50"
        />
      </Link>
      <Link
        to="/schedule"
        className={`nav-item ${
          location.pathname === "/schedule" ? "active" : ""
        }`}
      >
        <img
          className="icon"
          src={location.pathname === "/schedule" ? scheduleS : schedule}
          alt="schedule"
          width="50"
        />
      </Link>
      <Link
        to="/group"
        className={`nav-item ${location.pathname === "/group" ? "active" : ""}`}
      >
        <img
          className="icon"
          src={
            location.pathname === "/group" ||
            location.pathname === "/create-group"
              ? groupS
              : group
          }
          alt="group"
          width="50"
        />
      </Link>
      <Link
        to="/mypage"
        className={`nav-item ${
          location.pathname === "/mypage" ? "active" : ""
        }`}
      >
        <img
          className="icon"
          src={location.pathname === "/mypage" ? myS : my}
          alt="my"
          width="50"
        />
      </Link>
    </div>
  );
}

export default NavigationBar;
