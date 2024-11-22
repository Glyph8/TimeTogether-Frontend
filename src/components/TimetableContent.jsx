import GroupTimetable from './GroupTimetable.jsx';
import PersonalTimetable from '././PersonalTimetable.jsx';
import './TimetableContent.css';

import {useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
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
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const searchParams = new URLSearchParams(location.search);

    const { groupId } = useParams(); //groupId
    const isMgr = searchParams.get("isMgr") || false;
    const meetTitle = searchParams.get("meetTitle") || "";
    const meetType = searchParams.get("type") || 'OFFLINE';

    const response1 = {
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
    // useEffect(() => {
    //     console.log(`groupId : ${groupId}\ntype : ${meetType}\ntitle : ${meetTitle}`);
    //     // axios.post(`${testip}/group/${groupId}/when/${meetTitle}/${meetType}`, {
    //     axios.get(`http://192.168.166.198:8080/group/${groupId}/when/${meetTitle}/${meetType}`
    //         ,{
    //             headers:
    //                 {
    //                     Authorization: `Bearer ${accessToken}`
    //                 }
    //         }
    //     ).then((res) => {
    //         console.log('meetingSchedulItem : ', res.data);
    //         timetableData = res.data;
    //         //시간표 값 전달
    //     }).catch((err)=>{
    //         console.log(`MeetingScheduleItem에서 시간표정보 요청실패 ${err}`);
    //     })//로 request 보내고, 받아온 결과로 시간표 출력.
    //
    // }, []);
    const timetableData = response1;
    const [days, setDays] = useState([]);
    const [timeRange, setTimeRange] = useState("");
    const [btnColorChange, setBtnColorChange] = useState("add-personal-timeBtn")
    const myUserId = 'user1';
    const [loadPersonalTime, setLoadPersonalTime] = useState(false);

    const [priorityOn, setPriorityOn] = useState(false);

    let personalTimeData = useSelector((state)=> state.personalTimeData);
    let timeOnlyData = useSelector(state => state.timeOnlyData);
    let dispatch = useDispatch();

    let [isEdited, setIsEdited] = useState(false);

    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = [
        {id: 1, label: '1순위', date: '10/12 (토)', time: '09:00~10:00'},
        {id: 2, label: '2순위', date: '10/13 (토)', time: '10:00~12:00'},
        {id: 3, label: '3순위', date: '-', time: '-'}
    ];

    const handleSlotClick = (slotId) => {
        if (selectedSlot === slotId) {
            setSelectedSlot(null);
        } else {
            setSelectedSlot(slotId);
        }
    };

    const stableTimetableData = useMemo(() => {
        if (!timetableData) return null;
        return structuredClone(timetableData);
    }, [timetableData && JSON.stringify(timetableData)]); // 깊은 비교

    useEffect(() => {
        if (timetableData?.groupTimes) {
            setTimeRange(timetableData.groupTimes);
        }
    }, [timetableData?.groupTimes]);

    useEffect(() => {
        // dispatch(updatePersonalTimeData(returnMyTimeTable(timetableData, myUserId)));
        if (stableTimetableData) {
            setDays(returnMyTimeTable(stableTimetableData, myUserId));
        }
    }, [stableTimetableData, myUserId]);

    useEffect(() => {
        console.log("timetableData changed:", timetableData);
    }, [timetableData]);

    return (
        <div className="timetable-content">
            <GroupTimetable timetableData={stableTimetableData} timeRange={timeRange}/>
            {/*<GroupTimetable timetableData={timetableDataForGroup} timeRange={timeRange}/>*/}
            {loadPersonalTime ?
                // <PersonalTimetable days={personalTimeData} timeRange={timeRange}/>
                <PersonalTimetable days={days} timeRange={timeRange} priorityOn={priorityOn} setEdited={setIsEdited}/>
                : null}

            {
                loadPersonalTime ? <div className="calender-priority-btn">
                    <button
                        className={`load-calender-btn ${isEdited === false ? '' : 'editedBlock'}`} onClick={() => {
                        if (!isEdited) {
                            console.log("캘린더 불러오기 시작")
                            ///group/{groupId}/when/{title}/{type}/load
                            console.log("캘린더 불러오기 요청 보내기");
                            const postData = {
                                groupId: groupId,
                                type: meetType,
                                title: meetTitle,
                            }
                            axios.post(
                                // `${testip}/group/${groupId}/meet/${meetTitle}/add`
                                `http://192.168.164.228:8080/group/${groupId}/meet/${meetTitle}/add`
                                , postData,
                                {
                                    headers:
                                        {
                                            Authorization: `Bearer ${accessToken}`
                                        }
                                }
                            ).then((res) => {
                                console.log(`캘린더 불러오기 성공 : ${res.data}`);
                            }).catch((err) => {
                                console.log(`TimetableContent에서 캘린더 불러오기 요청실패 ${err}`);
                            })
                        }

                    }}>캘린더 불러오기
                    </button>
                    <button className="select-priority" onClick={() => {
                        setPriorityOn(!priorityOn);
                    }}>우선순위 선택하기
                    </button>
                </div> : null
            }

            <button className={btnColorChange} onClick={() => {
                if (!loadPersonalTime) {//'내 시간표 추가하기' 누른 경우
                    console.log("내 시간표 추가하기 버튼 클릭")
                    setLoadPersonalTime(true);
                    //API : /group/{groupId}/when/{title}/{type}/add
                    // axios.post(`${testip}/group/${groupId}/when/${meetTitle}/${meetType}/add`, null
                        axios.post(`http://192.168.166.198:8080/group/${groupId}/when/${meetTitle}/${meetType}/add`, null
                        , {
                            headers:
                                {
                                    Authorization: `Bearer ${accessToken}`
                                }
                        }
                    ).then((res) => {
                        console.log(res.data);
                        setLoadPersonalTime(true);
                    }).catch((err) => {
                        console.log(`timeTableContent에서 내 시간표 생성 요청실패 ${err}`);
                    })
                } else {//저장하기 상태에서 클릭하는 경우? 저장되었다는 의미로 버튼 색 변화
                    //다시 시간표 클릭해서 변동되면 캘린더 버튼 색 변화, 저장하기 색 복귀하도록 할것

                    setBtnColorChange("save-btn")

                    //API : /group/{groupId}/when/{title}/{type}/update
                    const myTableData = [ //dummy requset
                        {
                            "date": "2024-11-22",
                            "day": "금요일",
                            "time": "0000111000", //15분 단위이므로 2시간일때 8개
                            "rank": "0000121000"
                        }
                        // ,
                        // {
                        //     "date": "2024-11-05",
                        //     "day": "화요일",
                        //     "time": "1110000000",
                        //     "rank": "1310000000"
                        // },
                        // {
                        //     "date": "2024-11-06",
                        //     "day": "수요일",
                        //     "time": "0011000000",
                        //     "rank": "0013000000"
                        // }
                    ]
                    // const timeValues = timeOnlyData.map(day => day.time);
                    // dispatch(updateTimeValues(timeValues));
                    // dispatch(updateTimeValues(timeOnlyData))

                    dispatch(updateTimeValues(timeOnlyData))
                    console.log("갱신된 시간표 정보", timeOnlyData)
                    console.log("개인시간표 정보", personalTimeData);

                    // axios.post(`${testip}/group/${groupId}/when/${meetTitle}/${meetType}/update`, myTableData, {
                    axios.post(`http://192.168.166.198:8080/group/${groupId}/when/${meetTitle}/${meetType}/update`, myTableData, {
                            headers:
                                {
                                    Authorization: `Bearer ${accessToken}`
                                }
                        }
                    ).then((res) => {
                        console.log(res.data);
                        setLoadPersonalTime(true);
                    }).catch((err) => {
                        console.log(`timeTableContent에서 내 시간표 생성 요청실패 ${err}`);
                    })
                }
            }}>
                {
                    loadPersonalTime ? <p>저장하기</p> : (
                        <p>내 시간표 추가하기</p>
                    )
                }
            </button>

            <div className="done-container">
                <p className="done-header">우선순위를 고려해 시간을 추천해드려요.</p>
                <div className="done-time-slots">
                    {timeSlots.map((slot) => (
                        <div
                            key={slot.id}
                            className={`done-time-slot ${selectedSlot === slot.id ? 'done-selected' : ''}`}
                            onClick={() => handleSlotClick(slot.id)}
                        >
                            <span className="done-slot-label">{slot.label}</span>
                            <span className="done-slot-time">{slot.date}</span>
                            <span className="done-slot-time">{slot.time}</span>
                        </div>
                    ))}
                </div>
                <button
                    className={`done-decision-button ${selectedSlot ? 'done-selected' : ''}`}
                    onClick={() => {
                        //API : /group/{groupId}/when/{title}/{type}/add
                        if (selectedSlot !== null) {
                            console.log("timeTableContent에서 Done 요청");
                            // axios.post(`${testip}/group/${groupId}/when/${meetTitle}/${meetType}/done`, {
                                    axios.post(`http://192.168.164.228:8080/group/${groupId}/when/${meetTitle}/${meetType}/done`, {
                                    meetDt: "2024-10-09 14:30:00"
                                }, {
                                    headers:
                                        {
                                            Authorization: `Bearer ${accessToken}`
                                        }
                                }
                            ).then((res) => {
                                console.log("회의 결정 요청 성공 ", res.data);
                                setLoadPersonalTime(true);
                            }).catch((err) => {
                                console.log(`timeTableContent에서 회의 결정 요청실패 ${err}`);
                            })
                        }
                    }
                    }
                >
                    결정하기
                </button>
            </div>


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