import React from "react";
import "./MeetingScheduleItem.css";
import {useNavigate} from "react-router-dom";
import './MeetingGroupScheduleItem.css'
import axios from "axios";

const MeetingGroupScheduleItem = ({onMeetingNavigate, meeting, groupId}) => {
    const {meetTitle, meetDTstart, meetDTend, meetType, locationName} = meeting;
    const navigate = useNavigate();
    const loadMeetingInfo = () => {
        //const response = await axios.get("기존 시간표 내용 요청");
        console.log("load meetingInfo");
        const response = {
            code: 200,
            message: "요청에 성공하였습니다.",
            requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            groupTimes: "10002200", //오전 7시 - 오전 9시
            users: [
                {
                    userId: "user1",
                    days: [
                        {
                            date: "2024-10-07",
                            day: "월요일",
                            time: "101010101010101010101010",
                            rank: "100000000000100000000000",
                        },
                        {
                            date: "2024-10-08",
                            day: "화요일",
                            time: "010101010101010101010101",
                            rank: "010000000000010000000000",
                        },
                        {
                            date: "2024-10-09",
                            day: "수요일",
                            time: "111000111000111000111000",
                            rank: "001000000000001000000000",
                        },
                        {
                            date: "2024-10-10",
                            day: "목요일",
                            time: "000111000111000111000111",
                            rank: "000100000000000100000000",
                        },
                        {
                            date: "2024-10-11",
                            day: "금요일",
                            time: "100001000001000001000001",
                            rank: "000010000000000010000000",
                        },
                    ],
                },
                {
                    userId: "user2",
                    days: [
                        {
                            date: "2024-10-07",
                            day: "월요일",
                            time: "110011001100110011001100",
                            rank: "000001000000000001000000",
                        },
                        {
                            date: "2024-10-08",
                            day: "화요일",
                            time: "001100110011001100110011",
                            rank: "000000100000000000100000",
                        },
                        {
                            date: "2024-10-09",
                            day: "수요일",
                            time: "111100001111111100001111",
                            rank: "000000010000000000010000",
                        },
                        {
                            date: "2024-10-10",
                            day: "목요일",
                            time: "000011110000000011110000",
                            rank: "000000001000000000001000",
                        },
                        {
                            date: "2024-10-11",
                            day: "금요일",
                            time: "111111111111111111111111",
                            rank: "000000000100000000000100",
                        },
                    ],
                },
                {
                    userId: "user3",
                    days: [
                        {
                            date: "2024-10-07",
                            day: "월요일",
                            time: "100100100100100100100100",
                            rank: "000000000010000000000010",
                        },
                        {
                            date: "2024-10-08",
                            day: "화요일",
                            time: "011001100110011001100110",
                            rank: "000000000001000000000001",
                        },
                        {
                            date: "2024-10-09",
                            day: "수요일",
                            time: "101010101010101010101010",
                            rank: "000010000001000010000001",
                        },
                        {
                            date: "2024-10-10",
                            day: "목요일",
                            time: "010101010101010101010101",
                            rank: "000100100100000100100100",
                        },
                        {
                            date: "2024-10-11",
                            day: "금요일",
                            time: "110011001100110011001100",
                            rank: "100001000000100001000000",
                        },
                    ],
                },
                {
                    userId: "user4",
                    days: [
                        {
                            date: "2024-10-07",
                            day: "월요일",
                            time: "000000111111111111000000",
                            rank: "000000000010000000000010",
                        },
                        {
                            date: "2024-10-08",
                            day: "화요일",
                            time: "111111000000000000111111",
                            rank: "000000010000000000010000",
                        },
                        {
                            date: "2024-10-09",
                            day: "수요일",
                            time: "101010000000000000101010",
                            rank: "010000001000000001000000",
                        },
                        {
                            date: "2024-10-10",
                            day: "목요일",
                            time: "000000101010101010000000",
                            rank: "000010000000000010000000",
                        },
                        {
                            date: "2024-10-11",
                            day: "금요일",
                            time: "111000111000111000111000",
                            rank: "001000000000001000000000",
                        },
                    ],
                },
                {
                    userId: "user5",
                    days: [
                        {
                            date: "2024-10-07",
                            day: "월요일",
                            time: "001100001100001100001100",
                            rank: "000000000001000000000001",
                        },
                        {
                            date: "2024-10-08",
                            day: "화요일",
                            time: "110000110000110000110000",
                            rank: "000000000100000000000100",
                        },
                        {
                            date: "2024-10-09",
                            day: "수요일",
                            time: "111111000000111111000000",
                            rank: "000100000010000100000010",
                        },
                        {
                            date: "2024-10-10",
                            day: "목요일",
                            time: "000000111111000000111111",
                            rank: "010000000100000000100000",
                        },
                        {
                            date: "2024-10-11",
                            day: "금요일",
                            time: "101010101010101010101010",
                            rank: "100000000000100000000000",
                        },
                    ],
                },
            ],
        };
        console.log("미팅리스트에서 loadmeetingInfo : ", response);
        navigate("/meetings/:id/when/type", {
            state: {timetableData: response},
            // state: {timetableData: response.data}
        });
        //시간표 값 전달
    };

    return (
        <div className="meeting-group-item" onClick={onMeetingNavigate}
        >
            <div className="meeting-group-header">

                <div style={{display:'flex', flexDirection:'column'}}>

                <div
                    className={`meeting-group-status ${
                        meetType === "ONLINE" ? "online" : "offline"
                    }`}
                >
                    {meetType === "ONLINE" ? '온라인' : '오프라인'}
                </div>
                {locationName ?
                    <div className="meeting-group-location">{locationName}</div>
                    :
                    <div className="meeting-group-location">결정된 장소 없음</div>
                }
                </div>

                <div className="meeting-group-data">
                <div className="meeting-group-title">
                    {meetTitle}
                </div>

                {meetDTstart !== undefined ? (
                    <div className="meeting-group-time">
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

                )  : (
                    <div className="meeting-group-time">
                        아직 시간이 결정되지 않았습니다.
                    </div>
                )}

                </div>

            </div>
            {/*{locationName ?*/}
            {/*    <div className="meeting-group-location">{locationName}</div>*/}
            {/*    :*/}
            {/*    <div className="meeting-group-location">결정된 장소 없음</div>*/}
            {/*}*/}
        </div>
    );
};

export default MeetingGroupScheduleItem;
