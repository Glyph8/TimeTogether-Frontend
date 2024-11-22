import TimeGrid from '././TimeGrid.jsx';
import {useEffect, useState} from "react";
import ColorBar from "./ColorBar.jsx";
import GroupTimeGrid from "./GroupTimeGrid.jsx";

const GroupTimetable = ({timetableData, timeRange}) => {
    const [memberCount, setMemberCount] = useState(5);
    // const memberCount = members;
    const [onOffline, setOnOffline] = useState("오프라인");

    const [days, setDays] = useState([]);

    useEffect(() => {
        setDays(mergeTimes(timetableData));
        setMemberCount(timetableData.users.length);
    }, [timetableData]);

    return (
        <div className="group-timetable">
            <div className="group-timetable-header">
                <div className="on-offline" onClick={()=>{
                    //type변경 요청 API가 필요?
                    if(onOffline === '온라인') {
                        setOnOffline("오프라인");
                    }
                    if(onOffline === '오프라인') {
                        setOnOffline("온라인");
                    }

                }}>{onOffline}</div>
                <h3 className="section-title">그룹 시간표</h3>
                <p className="section-description">
                    시간을 클릭하면 누가 체크했는지 볼 수 있어요.
                </p>
                <div className="color-bar-out-container">
                    <div className="color-bar-container">
                        <span className="color-bar-text">0/{memberCount}</span>
                        <ColorBar memberCount={memberCount}></ColorBar>
                        <span className="color-bar-text">{memberCount}/{memberCount}</span>
                    </div>
                </div>
            </div>

            <GroupTimeGrid days={days} timeRange={timeRange} memberCount={memberCount}/>
        </div>
    );
};

function createEmptyTimes(timetableData) {
    let emptyTimes = [...timetableData.users[0].days];
    emptyTimes.map((eachDay) => {
        eachDay.rank = '0'.repeat(eachDay.rank.length);
        eachDay.time = '0'.repeat(eachDay.time.length);
    })
    return emptyTimes;
}


function mergeTimes(timetableData) {
    // 1. 시간표 값을 따라 하나로 합친다
    // 2. 그룹 시간표의 각 셀에 클릭 시 userID를 보여줘야.
    const mergedDays = createEmptyTimes(timetableData);

    const users = timetableData.users;

    users.map((user, i) => {
        user.days.map((eachDay, j)=>{
            mergedDays[j].time = addTimeDigit(mergedDays[j].time, eachDay.time);
        })
    })
    return mergedDays;
}


function addTimeDigit(str1, str2) {
    //console.log(str1, "과 ", str2, "을 합치기");
    if (str1.length !== str2.length) {
        throw new Error("시간 범위 불일치");
    }
    let result = "";
    for (let i = 0; i < str1.length; i++) {
        const digitSum = Number.parseInt(str1[i], 10) + Number.parseInt(str2[i], 10);
        result += digitSum.toString(); // 합산 후 문자열로 추가
    }
    return result;
}


export default GroupTimetable;