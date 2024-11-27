import React, { useState } from "react";
import "./MyHistoryPage.css"; // 스타일 파일 import
import NavigationBar from "../components/NavigationBar"; // 네비게이션 바 import
import ScheduleSearchBar from "../components/ScheduleSearchBar";
import searchIcon from "../assets/search-icon.png";
import GroupItemList from "../components/GroupItemList";
import MeetingScheduleItemList from "../components/MeetingScheduleItemList";
import BackButton from "../components/BackButton";

const MyHistoryPage = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="schedule-page">
      <h2 className="schedule-title">내 모임 기록</h2>
      <ScheduleSearchBar
        placeholder="키워드로 검색할 수 있어요!"
        onChange={handleSearchChange}
        value={searchText}
        iconSrc={searchIcon}
      />
      <div className="main-container">
        <MeetingScheduleItemList groupId={-1} searchText={searchText} />
      </div>
    </div>
  );
};

export default MyHistoryPage;
