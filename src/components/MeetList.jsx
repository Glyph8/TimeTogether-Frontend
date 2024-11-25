import React, { useState, useEffect } from "react";
import MeetingGroupScheduleItem from "../components/MeetingGroupScheduleItem.jsx";
import { useNavigate } from "react-router-dom";

function MeetList({
  groupId,
  totalNumber,
  isMgr,
  whenData,
  whenProcessData,
  groupName,
  groupMembers,
  groupImg,
}) {
  const nav = useNavigate();
  const handleNavigate = (meeting) => {
    nav(
      `/meetings/${groupId}/${meeting.meetId}?totalNumber=${totalNumber}&meetTitle=${meeting.meetTitle}&isMgr=${isMgr}&type=${meeting.meetType}`,
      {
        state: {
          groupName: groupName,
          groupMembers: groupMembers,
          groupImg: groupImg,
          isMgr: isMgr,
        },
      }
    );
  };

  return (
    <div
      className="meeting-list"
      style={{
        gap: "0",
        padding: "0",
        marginBottom: "20px",
        paddingBottom: "30px",
      }}
    >
      {!whenData || whenData.length === 0 ? (
        <header
          className="group-header"
          style={{ borderBottom: `5px solid #e4e4e4` }}
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
          style={{
            height: "100%",
            marginTop: "30px",
            marginBottom: "5px",
            backgroundColor: "rgba(162, 106, 240, 0.2)",
            borderRadius: "5px",
            // borderBottom: `5px solid #e4e4e4`,
          }}
        >
          <h2
            style={{
              height: "60px",
              textAlign: "center",
              lineHeight: "60px",
              color: "rgb(115, 26, 239)",
            }}
          >
            결정이 완료되지 않은 회의가 있어요
          </h2>
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
      <div
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "rgba(162, 106, 240, 0.2)",
          borderRadius: "5px",
        }}
      ></div>
    </div>
  );
}

export default MeetList;
