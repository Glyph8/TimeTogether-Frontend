import React, {useState, useEffect} from "react";
import {useParams, useNavigate, Routes, Route, useLocation} from "react-router-dom";
import MeetingScheduleItemList from "../components/MeetingScheduleItemList.jsx";
import CreateNewMeet from "../components/CreateNewMeet.jsx";
import MeetingScheduleItem from "../components/MeetingScheduleItem.jsx";


function MeetList({groupId, whenData, whenProcessData}) {
    const [doneList, setDoneList] = useState([]);
    const [processList, setProcessList] = useState([]);

    return (
        <div className="meeting-list">
            {whenData.length === 0 ?
                (<header className="group-header" style={{borderBottom: `5px solid #e4e4e4`}}>
                    <h2>결정된 모임 날짜가 없어요</h2>
                </header>)
                :
                null
            }
            {
                // doneList &&
                whenData &&
                whenData.map((meeting) => {
                    // doneList.map((meeting) => {
                    return (

                        <MeetingScheduleItem key={meeting.meetId} meeting={meeting}/>
                    )
                })
            }
            {whenProcessData.length !== 0 ?
                (<header className="group-header" style={{borderBottom: `5px solid #e4e4e4`}}>
                    <h2>결정이 완료되지 않은 회의</h2>
                </header>)
                :
                null
            }
            {
                // processList &&
                whenProcessData &&
                // processList.map((meeting) => (
                whenProcessData.map((meeting) => (
                    <MeetingScheduleItem key={meeting.meetId} meeting={meeting} groupId={groupId}/>
                ))
            }
        </div>
    )
}

function MeetingListPage({whenData, whenProcessData, groupId}) {
    const {totalNumber: totalNumber} = useParams(); //totalNumber
    const [makeNewMeeting, setMakeNewMeeting] = useState(false);

    return (
        <div className="group-page" style={{overflowY: 'auto'}}>
            <header className="group-header" style={{borderBottom: `5px solid #e4e4e4`}}>
                <h2>모임 일정</h2>
            </header>

            {makeNewMeeting ? (
                    <CreateNewMeet/>
                ) :
                (
                    <>
                        <MeetList groupId={groupId}
                                  whenData={whenData}
                                  whenProcessData={whenProcessData}/>

                        <button className="new-meet-day-button" onClick={() => {
                            setMakeNewMeeting(!makeNewMeeting);
                        }}>모임날짜 추가하기
                        </button>
                    </>
                )
            }
        </div>
    )
}


export default MeetingListPage;