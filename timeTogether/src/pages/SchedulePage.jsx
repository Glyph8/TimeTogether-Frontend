import React, { useState } from "react";
import "./SchedulePage.css"; // 스타일 파일 import
import NavigationBar from "../components/NavigationBar"; // 네비게이션 바 import
import ScheduleSearchBar from "../components/ScheduleSearchBar";
import searchIcon from "../assets/search-icon.png";
import GroupItemList from "../components/GroupItemList";
import MeetingScheduleItemList from "../components/MeetingScheduleItemList";

const dummyData = [
  { groupId: 1, groupName: "팀 1", groupImg: null },
  { groupId: 2, groupName: "졸프 팀", groupImg: null },
  { groupId: 3, groupName: "밴드 소모임", groupImg: null },
  { groupId: 4, groupName: "팀 4", groupImg: null },
  { groupId: 5, groupName: "팀 5", groupImg: null },
  { groupId: 6, groupName: "팀 6", groupImg: null },
  { groupId: 7, groupName: "팀 7", groupImg: null },
  { groupId: 8, groupName: "팀 8", groupImg: null },
];

const SchedulePage = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(-1); // 선택된 그룹 ID 상태

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleGroupClick = (groupId) => {
    setSelectedGroupId(groupId); // 선택된 그룹 ID를 업데이트
  };

  return (
    <div className="schedule-page">
      <h2 className="schedule-title">회의 일정</h2>
      <ScheduleSearchBar
        placeholder="키워드로 검색할 수 있어요!"
        onChange={handleSearchChange}
        value={searchText}
        iconSrc={searchIcon}
      />
      <div className="main-container">
        <GroupItemList
          groups={dummyData}
          onItemClick={handleGroupClick}
          selectedGroupId={selectedGroupId}
        />
        <MeetingScheduleItemList
          groupId={selectedGroupId}
          searchText={searchText}
        />
      </div>
    </div>
  );
};

export default SchedulePage;
