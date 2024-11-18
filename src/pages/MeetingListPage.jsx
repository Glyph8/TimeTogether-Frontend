import React, {useState, useEffect} from "react";
import {useParams, useNavigate, Routes, Route, useLocation} from "react-router-dom";

function MeetingListPage({whenData}) {
    const {id} = useParams();
    const location = useLocation();
    const {totalNumber: totalNumber} = useParams(); //totalNumber
    const navigate = useNavigate();

    const loadMeetingInfo = () => {
        //const response = await axios.get("기존 시간표 내용 요청");

        console.log("loadmeetingInfo");
        const response = {
            code: 200,
            message: "요청에 성공하였습니다.",
            requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            groupTimes: "10002200", //오전 7시 - 오전 9시
            users : [
                {
                    userId: "user1",
                    days: [
                        { date: "2024-10-07", day: "월요일", time: "101010101010101010101010", rank: "100000000000100000000000" },
                        { date: "2024-10-08", day: "화요일", time: "010101010101010101010101", rank: "010000000000010000000000" },
                        { date: "2024-10-09", day: "수요일", time: "111000111000111000111000", rank: "001000000000001000000000" },
                        { date: "2024-10-10", day: "목요일", time: "000111000111000111000111", rank: "000100000000000100000000" },
                        { date: "2024-10-11", day: "금요일", time: "100001000001000001000001", rank: "000010000000000010000000" }
                    ]
                },
                {
                    userId: "user2",
                    days: [
                        { date: "2024-10-07", day: "월요일", time: "110011001100110011001100", rank: "000001000000000001000000" },
                        { date: "2024-10-08", day: "화요일", time: "001100110011001100110011", rank: "000000100000000000100000" },
                        { date: "2024-10-09", day: "수요일", time: "111100001111111100001111", rank: "000000010000000000010000" },
                        { date: "2024-10-10", day: "목요일", time: "000011110000000011110000", rank: "000000001000000000001000" },
                        { date: "2024-10-11", day: "금요일", time: "111111111111111111111111", rank: "000000000100000000000100" }
                    ]
                },
                {
                    userId: "user3",
                    days: [
                        { date: "2024-10-07", day: "월요일", time: "100100100100100100100100", rank: "000000000010000000000010" },
                        { date: "2024-10-08", day: "화요일", time: "011001100110011001100110", rank: "000000000001000000000001" },
                        { date: "2024-10-09", day: "수요일", time: "101010101010101010101010", rank: "000010000001000010000001" },
                        { date: "2024-10-10", day: "목요일", time: "010101010101010101010101", rank: "000100100100000100100100" },
                        { date: "2024-10-11", day: "금요일", time: "110011001100110011001100", rank: "100001000000100001000000" }
                    ]
                },
                {
                    userId: "user4",
                    days: [
                        { date: "2024-10-07", day: "월요일", time: "000000111111111111000000", rank: "000000000010000000000010" },
                        { date: "2024-10-08", day: "화요일", time: "111111000000000000111111", rank: "000000010000000000010000" },
                        { date: "2024-10-09", day: "수요일", time: "101010000000000000101010", rank: "010000001000000001000000" },
                        { date: "2024-10-10", day: "목요일", time: "000000101010101010000000", rank: "000010000000000010000000" },
                        { date: "2024-10-11", day: "금요일", time: "111000111000111000111000", rank: "001000000000001000000000" }
                    ]
                },
                {
                    userId: "user5",
                    days: [
                        { date: "2024-10-07", day: "월요일", time: "001100001100001100001100", rank: "000000000001000000000001" },
                        { date: "2024-10-08", day: "화요일", time: "110000110000110000110000", rank: "000000000100000000000100" },
                        { date: "2024-10-09", day: "수요일", time: "111111000000111111000000", rank: "000100000010000100000010" },
                        { date: "2024-10-10", day: "목요일", time: "000000111111000000111111", rank: "010000000100000000100000" },
                        { date: "2024-10-11", day: "금요일", time: "101010101010101010101010", rank: "100000000000100000000000" }
                    ]
                }
            ]
        }
        console.log("미팅리스트에서 loadmeetingInfo : ", response);
        navigate("/meetings/:id/when/type", {
            state: {timetableData: response}
            // state: {timetableData: response.data}
        });
        //시간표 값 전달

    }

    const createNewMeeting = () => {
        console.log("createNewMeeting");
        //입력한 날짜 정보, 시간 정보 전달, 나머지는 빈 상태로 시간표 사용
        const data = {
            groupTimes: "07000900", //오전 7시 - 오전 9시 생성 시 입력한 시간
            users: [
                {
                    userId: "emptyTable",
                    days: [
                        {
                            date: "2024-10-09", //입력한 날짜
                            day: "수요일",
                            time: "00000000", //빈 시간표
                            rank: "00000000"
                        },
                        {
                            date: "2024-10-10",
                            day: "목요일",
                            time: "00000000",
                            rank: "00000000"
                        },
                        {
                            date: "2024-10-11",
                            day: "금요일",
                            time: "00000000",
                            rank: "00000000"
                        }
                    ]
                }
            ]
        }
        console.log("미팅리스트에서 createNewMEeting : ", data);
        navigate("/meetings/:id/when/type", {
            state: {timetableData: data} //timetablecontent로
        });
    }

    return (
        <>
            <div>모임일정</div>
            <div style={{display: 'flex', padding: '12px'}}

                 onClick={
                     loadMeetingInfo
                 }>
                {/*임시코드*/}
                <div>{whenData.meetType}</div>
                <div>{whenData.meetDTstart}</div>
                <div>{whenData.meetDTend}</div>
                <div>{whenData.locationName}</div>
            </div>
            <button>모임날짜 추가하기</button>
            {/* 클릭 시 달력 팝업 -> 날짜 선택 -> 시간범위선택(?? 일단 9-24로)
                        -> 그룹id, 선택한 날짜 데이터 전송
                        empty 그룹시간표 생성 */}

            <div>
                <div>달력들 임시코드</div>
                <button onClick={
                    createNewMeeting
                }>날짜 추가하기
                </button>
            </div>

        </>
    )
}



export default MeetingListPage;