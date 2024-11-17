import React, { useState, useEffect } from "react";
import MeetingScheduleItem from "./MeetingScheduleItem";
import "./MeetingScheduleItemList.css";

const dummyData = [
  {
    meetId: 1,
    meetDTstart: "2024-10-09 14:30:00",
    meetDTend: "2024-10-09 16:30:00",
    meetType: "오프라인",
    meetTitle: "산협프2 아이디어 회의",
    meetContent: null,
    groupName: "와쿠와쿠",
    locationName: "공차 어린이대공원역점",
    locationUrl:
      "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B1%B4%EB%8C%80+%ED%88%AC%EC%8D%B8+url",
  },
  {
    meetId: 2,
    meetDTstart: "2024-10-10 10:00:00",
    meetDTend: "2024-10-10 12:00:00",
    meetType: "온라인",
    meetTitle: "팀 프로젝트 중간 점검",
    meetContent: null,
    groupName: "와쿠와쿠",
    locationName: null,
    locationUrl: null,
  },
];

const MeetingScheduleItemList = ({ groupId, searchText }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 더미 데이터를 설정
    const fetchDummyData = () => {
      let meetings = [...dummyData]; // 기존 더미 데이터를 복사

      // groupId가 특정 값일 경우 새로운 미팅 데이터 추가
      if (groupId === 1) {
        meetings.push({
          meetId: 3,
          meetDTstart: "2024-10-12T15:00:00",
          meetDTend: "2024-10-12T17:00:00",
          meetType: "오프라인",
          meetTitle: "그룹 1 추가 미팅",
          locationName: "스타벅스 강남점",
          locationUrl:
            "https://search.naver.com/search.naver?where=nexearch&sm=tab_jum&query=스타벅스+강남점",
        });
      } else if (groupId === 2) {
        meetings.push({
          meetId: 4,
          meetDTstart: "2024-10-13T10:00:00",
          meetDTend: "2024-10-13T12:00:00",
          meetType: "온라인",
          meetTitle: "그룹 2 추가 미팅",
          locationName: null,
          locationUrl: null,
        });
      }

      setMeetings(meetings); // 상태 업데이트
      setLoading(false); // 로딩 상태 업데이트
    };

    fetchDummyData();
  }, [groupId]); // groupId가 변경될 때마다 실행

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       // searchText가 비어있는 경우 기본 데이터를 요청
  //       if (!searchText.trim()) {
  //         const response = await fetch(`/meet/list/${groupId}/find`);
  //         const data = await response.json();
  //         setMeetings(data.data.result);
  //       } else {
  //         // searchText가 있는 경우 검색 결과 요청
  //         const response = await fetch(
  //           `/meet/list/${groupId}/${searchText}/search`
  //         );
  //         const data = await response.json();
  //         setMeetings(data.data.result);
  //       }
  //     } catch (error) {
  //       console.error("데이터 로드 실패:", error);
  //     } finally {
  //       setLoading(false); // 로딩 상태 해제
  //     }
  //   };

  //   fetchData();
  // }, [groupId, searchText]); // groupId 또는 searchText가 변경될 때마다 실행

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (meetings.length === 0) {
    return <div>미팅 일정이 없습니다.</div>;
  }

  return (
    <div className="meeting-list">
      {meetings.map((meeting) => (
        <MeetingScheduleItem key={meeting.meetId} meeting={meeting} />
      ))}
    </div>
  );
};

export default MeetingScheduleItemList;
