import React from "react";
import "./MeetingScheduleItem.css";
import {useNavigate} from "react-router-dom";
import './MeetingGroupScheduleItem.css'
import axios from "axios";

const MeetingGroupScheduleItem = ({onMeetingNavigate, meeting, groupId}) => {
    const {meetTitle, meetDTstart, meetDTend, meetType, locationName} = meeting;
    const navigate = useNavigate();

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

        </div>
    );
};

export default MeetingGroupScheduleItem;
