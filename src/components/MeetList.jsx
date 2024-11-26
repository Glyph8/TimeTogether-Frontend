import React, {useState, useEffect} from "react";
import MeetingGroupScheduleItem from "../components/MeetingGroupScheduleItem.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function MeetList({groupId, totalNumber, isMgr, whenData, whenProcessData}) {
    const nav = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const handleNavigate = (meeting) => {
        console.log('meetList meetytype', meeting.meetType)
        if (!meeting.meetType) {
            meeting.meetType = 'OFFLINE';
        }
        // nav(
        //     `/meetings/${groupId}/${meeting.meetId}?totalNumber=${totalNumber}&meetTitle=${meeting.meetTitle}&isMgr=${isMgr}&type=${meeting.meetType}`
        // );
        console.log(`http://192.168.165.170:8080/group/${groupId}/when/${meeting.meetTitle}/${meeting.meetType}`)
        axios.get(`http://192.168.165.170:8080/group/${groupId}/when/${meeting.meetTitle}/${meeting.meetType}`
            , {
                headers:
                    {
                        Authorization: `Bearer ${accessToken}`
                    }
            }
        ).then((res) => {
            console.log('요청 시퀀스 후')
            console.log('timetableData에서 시간표 요청 성공 : ', res.data);
            // timetableData = res.data;
            if (res.data) {
                console.log('timetableData에서 시간표 요청 성공 : ', res.data);
                // setTimetableData(res.data); // 유효한 데이터만 저장
                // setTimetableData(getTables.data); // 유효한 데이터만 저장
                nav(`/meetings/${groupId}/${meeting.meetId}?totalNumber=${totalNumber}&meetTitle=${meeting.meetTitle}&isMgr=${isMgr}&type=${meeting.meetType}`, {
                    state: {timetableData: res.data.data}
                })
            } else {
                console.log('응답이 비어 있습니다.', res);
            }
            //시간표 값 전달
        }).catch((err) => {
            console.log(`timetableData에서 시간표 요청실패 ${err} dummy전달`);

            const dummy = {
                code: 200,
                message: "요청에 성공하였습니다.",
                requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                groupTimes: "07001200", //오전 7시 - 오전 9시
                type: "OFFLINE",
                users: [
                    {
                        userId: "user1",
                        days: [
                            {
                                date: "2024-11-13",
                                day: "수요일",
                                time: "1010101001",
                                rank: "1000000001",
                            },
                            {
                                date: "2024-11-14",
                                day: "목요일",
                                time: "0101010101",
                                rank: "0100000001",
                            },
                            {
                                date: "2024-11-15",
                                day: "금요일",
                                time: "1110001101",
                                rank: "0010000001",
                            }
                        ],
                    },
                    {
                        userId: "user2",
                        days: [
                            {
                                date: "2024-10-13",
                                day: "수요일",
                                time: "1100110000",
                                rank: "0000010000",
                            },
                            {
                                date: "2024-10-14",
                                day: "목요일",
                                time: "0011001100",
                                rank: "0000001000",
                            },
                            {
                                date: "2024-10-15",
                                day: "금요일",
                                time: "1111000000",
                                rank: "0000000100",
                            },
                        ],
                    },
                    {
                        userId: "user3",
                        days: [
                            {
                                date: "2024-10-13",
                                day: "수요일",
                                time: "1000110011",
                                rank: "1000010011",
                            },
                            {
                                date: "2024-10-14",
                                day: "목요일",
                                time: "0111011111",
                                rank: "0000001011",
                            },
                            {
                                date: "2024-10-15",
                                day: "금요일",
                                time: "0000000111",
                                rank: "0000000111",
                            },
                        ],
                    },

                ],
            };
            nav(`/meetings/${groupId}/${meeting.meetId}?totalNumber=${totalNumber}&meetTitle=${meeting.meetTitle}&isMgr=${isMgr}&type=${meeting.meetType}`, {
                state: {timetableData: dummy}
            })
        })
    }


        return (

            <div className="meeting-list" style={{
                gap: '0',
                padding: '0',
            }}>
                {(!whenData || whenData.length === 0) ? (
                    <header
                        className="group-header"
                        style={{borderBottom: `5px solid #e4e4e4`, height: '100%'}}
                    >
                        <h2 style={{
                            height: '60px',
                            textAlign: "center",
                            lineHeight: '60px',
                        }}>결정된 모임 날짜가 없어요</h2>
                    </header>
                ) : null}
                {
                    // doneList &&
                    whenData &&
                    whenData.map((meeting) => {
                        return (
                            <MeetingGroupScheduleItem
                                onMeetingNavigate={() => handleNavigate(meeting)}
                                key={meeting.meetId}
                                meeting={meeting}
                            />
                        );
                    })
                }

                {whenProcessData.length !== 0 ? (
                    <header
                        className="group-header"
                        style={{
                            height: '100%',
                            borderBottom: `5px solid #e4e4e4`
                        }}
                    >
                        <h2 style={{
                            height: '60px',
                            textAlign: "center",
                            lineHeight: '60px',
                        }}>결정이 완료되지 않은 회의가 있어요</h2>
                    </header>
                ) : null}
                {console.log('process data', whenProcessData)}
                {
                    // processList &&
                    whenProcessData &&
                    // processList.map((meeting) => (
                    whenProcessData.map((meeting) => (

                        <MeetingGroupScheduleItem
                            onMeetingNavigate={() => handleNavigate(meeting)}
                            key={meeting.meetId}
                            meeting={meeting}
                            groupId={groupId}
                        />
                    ))
                }
            </div>
        );
    }

    export default MeetList;
