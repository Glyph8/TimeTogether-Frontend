import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"; // 뒤로 가기 아이콘
import { GiHamburgerMenu } from "react-icons/gi"; // 햄버거 아이콘
import MeetingScheduleItemList from "../components/MeetingScheduleItemList.jsx";
import CreateNewMeet from "../components/CreateNewMeet.jsx";
import MeetingScheduleItem from "../components/MeetingScheduleItem.jsx";
import MeetingGroupScheduleItem from "../components/MeetingGroupScheduleItem.jsx";
import MeetList from "../components/MeetList.jsx";
import InGroupModal from "../components/InGroupModal";

const MeetingListPage = () => {
  const { groupId } = useParams(); //groupId
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const totalNumber = searchParams.get("totalNumber") || 1;
  // const isMgr = searchParams.get("isMgr") || false;
  const [makeNewMeeting, setMakeNewMeeting] = useState(false);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [whenData, setWhenData] = useState([]);
  const [whenProcessData, setWhenProcessData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

  // 전달된 state (groupName, groupMembers 등) 받기
  const {
    groupName: passedGroupName,
    groupMembers,
    groupImg,
    isMgr,
  } = location.state || {};
  const [groupName, setGroupName] = useState(passedGroupName || ""); // 네비게이션으로 받은 groupName을 기본값으로 사용

  useEffect(() => {
    //GroupCard Click event로 시작
    // const whenDataResponse = axios.get(`http://192.168.166.198:8080/group/${groupId}/meet`, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     })
    //     .then((res) => {
    //         const responseData = res.data.data;
    //         console.log(responseData);
    //         setWhenData(whenDataResponse.result);
    //         setWhenProcessData(whenDataResponse.meeting);
    //     }).catch((err) => {
    //         console.log(`MeeingListPage서 회의 리스트 요청실패 ${err}`);
    //     })

    //여기까지 연결

    const whenDataResponse = {
      code: 200,
      message: "요청에 성공하였습니다.",
      requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      result: [
        {
          meetId: 8,
          meetDTstart: "2024-10-09 14:30:00",
          meetDTend: "2024-10-09 16:30:00",
          meetType: "OFFLINE",
          meetTitle: "test",
          meetContent: null,
          groupName: "와쿠와쿠",
          locationName: "투썸",
          locationUrl:
            "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B1%B4%EB%8C%80+%ED%88%AC%EC%8D%B8+url",
        },
        {
          meetId: 9,
          meetDTstart: "2024-10-09 14:30:00",
          meetDTend: "2024-10-09 16:30:00",
          meetType: "OFFLINE",
          meetTitle: "test1",
          meetContent: null,
          groupName: "와쿠와쿠",
          locationName: "K큐브",
          locationUrl:
            "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B1%B4%EB%8C%80+%ED%88%AC%EC%8D%B8+url",
        },
        {
          meetId: 10,
          meetDTstart: "2024-10-09 13:30:00",
          meetDTend: "2024-10-09 16:30:00",
          meetType: "OFFLINE",
          meetTitle: "final",
          meetContent: null,
          groupName: "와쿠와쿠",
          locationName: "K큐브",
          locationUrl:
            "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B1%B4%EB%8C%80+%ED%88%AC%EC%8D%B8+url",
        },
      ],
      process: [
        {
          meetId: 10,
          meetTitle: "abcd",
          meetType: "OFFLINE",
        },
        {
          meetId: 11,
          meetTitle: "아키텍쳐 클래스 회의",
          meetType: "OFFLINE",
        },
      ],
    };
    setWhenData(whenDataResponse.result);
    setWhenProcessData(whenDataResponse.process);
    //여기까지 회의 리스트 더미데이터
  }, [groupId, totalNumber]);

  const handleBack = () => {
    navigate(-1); // 브라우저의 이전 페이지로 이동
  };

  return (
    <div className="group-page" style={{ overflowY: "auto" }}>
      <header
        className="group-header"
        style={{
          // borderBottom: `5px solid #e4e4e4`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "0px 4px 10px 0px #0000000a",
          marginBottom: "5px",
        }}
      >
        <BiArrowBack
          size={25}
          style={{ cursor: "pointer" }}
          onClick={handleBack}
        />
        <h2 style={{ fontWeight: "600", fontSize: "1.3rem" }}>
          {" "}
          {groupName ? `${groupName} 팀` : "모임 일정"}
        </h2>
        <GiHamburgerMenu
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => setIsModalOpen(true)}
        />
      </header>

      {makeNewMeeting ? (
        <CreateNewMeet />
      ) : (
        <>
          <MeetList
            groupId={groupId}
            totalNumber={totalNumber}
            isMgr={isMgr}
            whenData={whenData}
            whenProcessData={whenProcessData}
            groupName={groupName}
            groupMembers={groupMembers}
            groupImg={groupImg}
          />
          <button
            className="new-meet-day-button"
            onClick={() => {
              setMakeNewMeeting(!makeNewMeeting);
            }}
            style={{
              cursor: "pointer",
              position: "sticky",

              marginBottom: "25px",
            }}
          >
            모임날짜 추가하기
          </button>
        </>
      )}
      {/* 그룹 정보 모달 */}
      <InGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // 모달 닫기
        groupImg={groupImg}
        groupName={groupName}
        groupMembers={groupMembers || []} // 멤버 리스트 전달
        isMgr={isMgr} // isMgr 전달
        groupId={groupId}
      />
    </div>
  );
};

export default MeetingListPage;
