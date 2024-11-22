import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MeetingScheduleItemList from "../components/MeetingScheduleItemList.jsx";
import CreateNewMeet from "../components/CreateNewMeet.jsx";
import MeetingScheduleItem from "../components/MeetingScheduleItem.jsx";
import MeetingGroupScheduleItem from "../components/MeetingGroupScheduleItem.jsx";
import MeetList from "../components/MeetList.jsx";

const MeetingListPage = () => {
  const { groupId } = useParams(); //groupId
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const totalNumber = searchParams.get("totalNumber") || 1;
  const isMgr = searchParams.get("isMgr") || false;
  const [makeNewMeeting, setMakeNewMeeting] = useState(false);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [whenData, setWhenData] = useState([]);
  const [whenProcessData, setWhenProcessData] = useState([]);


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

    const whenDataResponse = {
      code: 200,
      message: "요청에 성공하였습니다.",
      requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      result: [
        {
          "meetId": 8,
          "meetDTstart": "2024-10-09 14:30:00",
          "meetDTend": "2024-10-09 16:30:00",
          "meetType": "OFFLINE",
          "meetTitle": "test",
          "meetContent": null,
          "groupName": "와쿠와쿠",
          "locationName": "투썸",
          "locationUrl": "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B1%B4%EB%8C%80+%ED%88%AC%EC%8D%B8+url"
        },
        {
          "meetId": 9,
          "meetDTstart": "2024-10-09 14:30:00",
          "meetDTend": "2024-10-09 16:30:00",
          "meetType": "OFFLINE",
          "meetTitle": "test1",
          "meetContent": null,
          "groupName": "와쿠와쿠",
          "locationName": "K큐브",
          "locationUrl": "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B1%B4%EB%8C%80+%ED%88%AC%EC%8D%B8+url"
        }
        ,
        {
          "meetId": 10,
          "meetDTstart": "2024-10-09 13:30:00",
          "meetDTend": "2024-10-09 16:30:00",
          "meetType": "OFFLINE",
          "meetTitle": "final",
          "meetContent": null,
          "groupName": "와쿠와쿠",
          "locationName": "K큐브",
          "locationUrl": "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B1%B4%EB%8C%80+%ED%88%AC%EC%8D%B8+url"
        }
      ],
      process: [
        {
          "meetId": 10,
          "meetTitle": "abcd",
          "meetType": "OFFLINE"
        },
        {
          "meetId": 11,
          "meetTitle": "아키텍쳐 클래스 회의",
          "meetType": "OFFLINE"
        }
      ],
    }
    setWhenData(whenDataResponse.result);
    setWhenProcessData(whenDataResponse.process);
    //여기까지 회의 리스트 더미데이터
  }, [groupId, totalNumber]);

  return (
    <div className="group-page" style={{ overflowY: "auto" }}>
      <header
        className="group-header"
        style={{ borderBottom: `5px solid #e4e4e4` }}
      >
        <h2>모임 일정</h2>
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
          />
          <button
            className="new-meet-day-button"
            onClick={() => {
              setMakeNewMeeting(!makeNewMeeting);
            }}
          >
            모임날짜 추가하기
          </button>
        </>
      )}
    </div>
  );
};

export default MeetingListPage;
