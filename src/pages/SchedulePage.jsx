import React, { useState, useEffect } from "react";
import "./SchedulePage.css"; // 스타일 파일 import
import NavigationBar from "../components/NavigationBar"; // 네비게이션 바 import
import ScheduleSearchBar from "../components/ScheduleSearchBar";
import searchIcon from "../assets/search-icon.png";
import GroupItemList from "../components/GroupItemList";
import MeetingScheduleItemList from "../components/MeetingScheduleItemList";
import axios from "axios";
const accessToken = localStorage.getItem("accessToken");

const SchedulePage = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(-1); // 선택된 그룹 ID 상태
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // GET 요청
        const response = await axios.get("/group/groups/view", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 토큰 추가
          },
        });

        // 응답 데이터에서 groups 상태로 업데이트
        if (response.data.httpStatus === "OK") {
          setGroups(response.data.data); // 응답의 data를 groups 상태에 저장
        } else {
          alert(
            response.data.message || "그룹 목록을 가져오는 데 실패했습니다."
          );
        }
      } catch (error) {
        console.error(
          "에러 발생:",
          error.response?.data?.message || error.message
        );
        alert(
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        );
      }
    };

    fetchGroups(); // 데이터 요청 실행
  }, []); // 컴포넌트 마운트 시 한 번 실행

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
          groups={groups}
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
