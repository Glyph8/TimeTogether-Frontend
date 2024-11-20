import GroupTimetable from './GroupTimetable.jsx';
import PersonalTimetable from '././PersonalTimetable.jsx';
import './TimetableContent.css';

import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {updatePersonalTimeData, updateTimeValues} from "../store.js";

/*
meetId: 10,
meetDTstart: "2024-10-09 14:30:00",
meetDTend: "2024-10-09 16:30:00",
meetType: "오프라인",
meetTitle: "산협프2 아이디어 회의",
meet
Content: null,
groupName: "와쿠와쿠",
*/

const TimetableContent = () => {
    const location = useLocation();
    //const timetableData = location.state?.timetableData;
    const timetableData = location.state?.timetableData; //MeetingListPage로부터 data 받아옴.

    const timetableDataForGroup = structuredClone(timetableData); //개인-그룹 시간표 영향 해결

    const [days, setDays] = useState([]);
    const [timeRange, setTimeRange] = useState("");

    const [btnColorChange, setBtnColorChange] = useState("add-personal-timeBtn")

    const myUserId = 'user2'; //임시 왜 user1이면 이상한 값이 받아와지는가
    const [loadPersonalTime, setLoadPersonalTime] = useState(false);

    const [priorityOn, setPriorityOn] = useState(false);


    let personalTimeData = useSelector((state)=> state.personalTimeData);
    let timeOnlyData = useSelector(state => state.timeOnlyData);
    let dispatch = useDispatch();

    //groupID로 요청.
    //axios.get('group/groupID/when/meet/{groupId}')


    useEffect(() => {
        if (timetableData.users.length === 1) {
            setLoadPersonalTime(false);
        } else {
            setLoadPersonalTime(true);
        }

        setTimeRange(timetableData.groupTimes);

        // dispatch(updatePersonalTimeData(returnMyTimeTable(timetableData, myUserId)));

        setDays(returnMyTimeTable(timetableData, myUserId));//userID 일치하는 시간표 값 가져오기

        setLoadPersonalTime(checkPersonalTime(timetableData, myUserId));

    }, [days, timetableData, timetableData.groupTimes, timetableData.users]);


    return (
        <div className="timetable-content">
            <GroupTimetable timetableData={timetableDataForGroup} timeRange={timeRange}/>
            {loadPersonalTime ?
                // <PersonalTimetable days={personalTimeData} timeRange={timeRange}/>
                <PersonalTimetable days={days} timeRange={timeRange} priorityOn={priorityOn}/>
                : null}

            {
                loadPersonalTime ? <div className="calender-priority-btn">
                    <button className="load-calender-btn" onClick={()=>{
                        console.log("캘린더 불러오기 요청 보내기");

                        ///group/{groupId}/when/{title}/{type}/load
                        //request :: post ::
                        // {
                        //     "groupId" : "101",
                        //     "type" : "online",
                        //     "title": "밴드 회식"
                        // }

                    }}>캘린더 불러오기</button>
                    <button className="select-priority" onClick={()=>{
                        setPriorityOn(!priorityOn);
                    }}>우선순위 선택하기</button>
                </div> : null
            }

            <button className={btnColorChange} onClick={() => {
                if (!loadPersonalTime) {//'내 시간표 추가하기' 누른 경우
                    setLoadPersonalTime(true);

                } else {//저장하기 상태에서 클릭하는 경우? 저장되었다는 의미로 버튼 색 변화
                    setBtnColorChange("save-btn")
                }
            }}>{
                loadPersonalTime ? <p onClick={() => {
                    //바뀐 내용을 내보내야함.
                    // axios.post(`group/${groupId}/when/${type}/add`)
                    //     .then(req => )

                    // const timeValues = timeOnlyData.map(day => day.time);
                    // dispatch(updateTimeValues(timeValues));
                    // dispatch(updateTimeValues(timeOnlyData))

                    dispatch(updateTimeValues(timeOnlyData))
                    console.log("갱신된 시간표 정보", timeOnlyData)
                    console.log("개인시간표 정보", personalTimeData);

                }}>저장하기</p> : (
                    <p>내 시간표 추가하기</p>
                )
            }</button>


        </div>
    );
};

function createEmptyTimes(timetableData) {//groupTimeTable에도 있음.
    const emptyTimes = timetableData.users[0].days;
    emptyTimes.map((eachDay) => {
        eachDay.time = '0'.repeat(eachDay.time.length);
        eachDay.rank = '0'.repeat(eachDay.time.length);
    })
    return emptyTimes;
}

function returnMyTimeTable(timetableData, myUserId) {
    for (let i = 0; i < timetableData.users.length; i++) {
        if (timetableData.users[i].userId === myUserId) {
            console.log("개인시간표가 있어서 해당 시간표를 로드함.")
            console.log(timetableData.users[i].days);
            return timetableData.users[i].days;
        }
    }
    console.log("개인시간표가 없어서 빈 시간표를 로드함.")
    return createEmptyTimes(timetableData);
}

function checkPersonalTime(timetableData, myUserId) {
    for (let i = 0; i < timetableData.users.length; i++) {
        if (timetableData.users[i].userId === myUserId) {
            return true;
        }
    }
    return false;
}


export default TimetableContent;