import {useEffect, useState} from "react";
import ColorBar from "./ColorBar.jsx";
import GroupTimeGrid from "./GroupTimeGrid.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    setFirstDataFormat,
    setFirstDate,
    setFirstTime,
    setSecondDate,
    setSecondTime,
    setThirdDate,
    setThirdTime
} from "../store.js";


const GroupTimetable = ({timetableData, timeRange, setMeetType}) => {
    // console.log('timetable data props', timetableData);

    const [memberCount, setMemberCount] = useState(5);
    // const memberCount = members;
    const [onOffline, setOnOffline] = useState("오프라인");

    const [days, setDays] = useState([]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const findTopOverlapTimesAndDispatch = (timetableData) => {
        const mergedDays = mergeTimes(timetableData);

        // groupTimes 값을 통해 시간표의 시작 및 끝 시간 설정
        const startHour = parseInt(timetableData.groupTimes.slice(0, 2), 10); // 시작 시간 (예: "10" -> 10시)
        const endHour = parseInt(timetableData.groupTimes.slice(2, 4), 10); // 끝 시간 (예: "22" -> 22시)

        // 시간별로 겹치는 인원 수를 계산
        const overlapScores = mergedDays.map(day => {
            const timeScores = day.time.split('').map(Number); // 각 시간의 숫자로 변환
            return {
                date: day.date,
                scores: timeScores, // 각 시간대의 겹침 수 배열
            };
        });

        // 모든 시간대를 순회하여 점수와 정보를 정리
        const timeRanking = [];
        overlapScores.forEach(day => {
            day.scores.forEach((score, index) => {
                timeRanking.push({
                    date: day.date,
                    timeSlot: convertIndexToTimeRange(index, startHour), // 시작 시간을 반영하여 변환
                    score: score, // 해당 시간대 겹치는 수
                });
            });
        });

        // 점수를 기준으로 내림차순 정렬 후 상위 3개 선택
        const topThree = timeRanking
            .sort((a, b) => b.score - a.score) // 점수 내림차순 정렬
            .slice(0, 3); // 상위 3개 선택

        // Redux dispatch로 상위 3개 저장
        if (topThree[0]) {
            dispatch(setFirstDate(topThree[0].date));
            dispatch(setFirstTime(topThree[0].timeSlot)); // 변환된 시간 범위를 전달
        }
        if (topThree[1]) {
            dispatch(setSecondDate(topThree[1].date));
            dispatch(setSecondTime(topThree[1].timeSlot));
        }
        if (topThree[2]) {
            dispatch(setThirdDate(topThree[2].date));
            dispatch(setThirdTime(topThree[2].timeSlot));
        }
    };

// 시간대 인덱스를 시간 범위로 변환하는 함수
    const convertIndexToTimeRange = (index, startHour) => {
        let baseHour = startHour + Math.floor(index / 2); // index를 시간 기준으로 변환
        const startMinute = index % 2 === 0 ? "00" : "30"; // 0: 정각, 1: 30분
        const nextHour = startHour + Math.floor((index + 1) / 2);
        const endMinute = (index + 1) % 2 === 0 ? "00" : "30";

        if (baseHour < 10) {
            return `0${baseHour}:${startMinute}`;
        } else {
            return `${baseHour}:${startMinute}`;
        }
        // return `${baseHour}:${startMinute}~${nextHour}:${endMinute}`;
    };

    useEffect(() => {
        // if(!timetableData) {
        if (Object.keys(timetableData).length !== 0) {
            console.log('grouptimeTableJSX', timetableData);
            setDays(mergeTimes(timetableData));
            setMemberCount(timetableData.users.length);
            findTopOverlapTimesAndDispatch(timetableData);
        }

    }, [timetableData]);

    return (
        <div className="group-timetable">
            <div className="group-timetable-header">
                <div className="on-offline" onClick={() => {
                    //type변경 요청 API가 필요?
                    if (onOffline === '온라인') {
                        setOnOffline("오프라인");
                        const params = new URLSearchParams(location.search);
                        params.set("type", "OFFLINE"); // 쿼리 파라미터 type의 값을 ONLINE으로 설정
                        const newUrl = `${location.pathname}?${params.toString()}`;
                        // navigate(newUrl, { replace: true }); // URL 업데이트
                        setMeetType('OFFLINE')
                        navigate(newUrl, {replace: true}); // URL 업데이트
                    }
                    if (onOffline === '오프라인') {
                        setOnOffline("온라인");
                        const params = new URLSearchParams(location.search);
                        params.set("type", "ONLINE"); // 쿼리 파라미터 type의 값을 ONLINE으로 설정
                        const newUrl = `${location.pathname}?${params.toString()}`;
                        setMeetType('ONLINE')
                        navigate(newUrl, {replace: true}); // URL 업데이트
                        // navigate(newUrl, { replace: true }); // URL 업데이트
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
    const stableTimetableData = structuredClone(timetableData);
    console.log('create', stableTimetableData)
    if(Object.keys(stableTimetableData).length !== 0) {
        let emptyTimes = stableTimetableData.users[0].days;
        // let emptyTimes = [...timetableData.users[0].days];
        emptyTimes.map((eachDay) => {
            eachDay.rank = '0'.repeat(eachDay.rank.length);
            eachDay.time = '0'.repeat(eachDay.time.length);
        })
        return emptyTimes;
    }
}

function mergeTimes(timetableData) {
    // 1. 시간표 값을 따라 하나로 합친다

    const mergedDays = createEmptyTimes(timetableData);

    const users = timetableData.users;

    users.map((user, i) => {
        user.days.map((eachDay, j) => {
            mergedDays[j].time = addTimeDigit(mergedDays[j].time, eachDay.time);
            mergedDays[j].rank = addTimeDigit(mergedDays[j].rank, eachDay.rank);
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