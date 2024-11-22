import React, {useState, useEffect} from "react";
import MeetingGroupScheduleItem from "../components/MeetingGroupScheduleItem.jsx";
import {useNavigate} from "react-router-dom";

function MeetList({groupId, totalNumber, isMgr, whenData, whenProcessData}) {
    const nav = useNavigate();
    const handleNavigate = (meeting) => {
        nav(
            `/meetings/${groupId}/${meeting.meetId}?totalNumber=${totalNumber}&meetTitle=${meeting.meetTitle}&isMgr=${isMgr}&type=${meeting.meetType}`
        );
    };

    return (

        <div className="meeting-list">
            {whenData.length === 0 ? (
                <header
                    className="group-header"
                    style={{borderBottom: `5px solid #e4e4e4`}}
                >
                    <h2>결정된 모임 날짜가 없어요</h2>
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
                    style={{borderBottom: `5px solid #e4e4e4`}}
                >
                    <h2>결정이 완료되지 않은 회의</h2>
                </header>
            ) : null}
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