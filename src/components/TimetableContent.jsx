
import GroupTimetable from './GroupTimetable.jsx';
import PersonalTimetable from '././PersonalTimetable.jsx';
import './TimetableContent.css';

import {useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import store, {
    updatePersonalTimeData,
    updateRankOnly,
    updateRankValues,
    updateTimeOnly,
    updateTimeValues
} from "../store.js";
import GroupCellModal from "./GroupCellModal.jsx";
import groupCellModal from "./GroupCellModal.jsx";

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
    // const accessToken = 1;
    const refreshToken = localStorage.getItem("refreshToken");
    const searchParams = new URLSearchParams(location.search);

    const { groupId } = useParams(); //groupId
    const isMgr = searchParams.get("isMgr") || false;
    const meetTitle = searchParams.get("meetTitle") || "";
    const meetType = searchParams.get("meetType") || "OFFLINE";

    //http://192.168.165.170:8080/group/1/when/test/OFFLINE
    //연결시작
    // console.log(`connect start -- groupId : ${groupId}\ntype : ${meetType}\ntitle : ${meetTitle}`);
    // console.log('[check undifine]', groupId, meetType, meetTitle, accessToken);

    // const [timetableData, setTimetableData] = useState([]);
    // let timetableData;

    //dummyData 불러오기
    // dummy start
    // const response1 = {
    //     code: 200,
    //     message: "요청에 성공하였습니다.",
    //     requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    //     groupTimes: "07001200", //오전 7시 - 오전 9시
    //     type: "OFFLINE",
    //     users: [
    //         {
    //             userId: "user1",
    //             days: [
    //                 {
    //                     date: "2024-11-13",
    //                     day: "수요일",
    //                     time: "1010101001",
    //                     rank: "1000000001",
    //                 },
    //                 {
    //                     date: "2024-11-14",
    //                     day: "목요일",
    //                     time: "0101010101",
    //                     rank: "0100000001",
    //                 },
    //                 {
    //                     date: "2024-11-15",
    //                     day: "금요일",
    //                     time: "1110001101",
    //                     rank: "0010000001",
    //                 }
    //             ],
    //         },
    //         {
    //             userId: "user2",
    //             days: [
    //                 {
    //                     date: "2024-10-13",
    //                     day: "수요일",
    //                     time: "1100110000",
    //                     rank: "0000010000",
    //                 },
    //                 {
    //                     date: "2024-10-14",
    //                     day: "목요일",
    //                     time: "0011001100",
    //                     rank: "0000001000",
    //                 },
    //                 {
    //                     date: "2024-10-15",
    //                     day: "금요일",
    //                     time: "1111000000",
    //                     rank: "0000000100",
    //                 },
    //             ],
    //         },
    //         {
    //             userId: "user3",
    //             days: [
    //                 {
    //                     date: "2024-10-13",
    //                     day: "수요일",
    //                     time: "1000110011",
    //                     rank: "1000010011",
    //                 },
    //                 {
    //                     date: "2024-10-14",
    //                     day: "목요일",
    //                     time: "0111011111",
    //                     rank: "0000001011",
    //                 },
    //                 {
    //                     date: "2024-10-15",
    //                     day: "금요일",
    //                     time: "0000000111",
    //                     rank: "0000000111",
    //                 },
    //             ],
    //         },
    //
    //     ],
    // };
    // setTimetableData(response1);
    // timetableData = response1;

    // useEffect(() => {
    //     if (!groupId || !meetTitle || !accessToken) {
    //         console.log('필수 데이터가 누락되었습니다.', { groupId, meetTitle, accessToken });
    //         return; // 필수 데이터가 없는 경우 early return
    //     }
    //     else{
    //         console.log('all defined')
    //     }
    //
    //     console.log(`groupId : ${groupId}\ntype : ${meetType}\ntitle : ${meetTitle}`);
    //     // axios.post(`${testip}/group/${groupId}/when/${meetTitle}/${meetType}`, {
    //     const getTables = axios.get(`kkkkk`
    //         // axios.get(`http://192.168.165.170:8080/group/${groupId}/when/${meetTitle}/${meetType}`
    //         ,{
    //             headers:
    //                 {
    //                     Authorization: `Bearer ${accessToken}`
    //                 }
    //         }
    //     ).then((res) => {
    //         console.log('요청 시퀀스 후')
    //         console.log('timetableData에서 시간표 요청 성공 : ', res.data);
    //         // timetableData = res.data;
    //         if (res.data) {
    //             console.log('timetableData에서 시간표 요청 성공 : ', res.data);
    //             // setTimetableData(res.data); // 유효한 데이터만 저장
    //             // setTimetableData(getTables.data); // 유효한 데이터만 저장
    //             timetableData = (getTables.data); // 유효한 데이터만 저장
    //         } else {
    //             console.log('응답이 비어 있습니다.', res);
    //         }
    //         //시간표 값 전달
    //     }).catch((err)=>{
    //         console.log(`timetableData에서 시간표 요청실패 ${err}`);
    //
    //
    //     })//로 request 보내고, 받아온 결과로 시간표 출력.
    //     console.log('요청 시퀀스 후')
    // }, [accessToken, groupId, meetTitle, meetType]);
    // 여기까지 연결

    const timetableData = location.state?.timetableData; //MeetingListPage로부터 data 받아옴.

    const [days, setDays] = useState([]);
    const [timeRange, setTimeRange] = useState("");
    const [btnColorChange, setBtnColorChange] = useState("add-personal-timeBtn")
    const myUserId = 'user9';
    const [loadPersonalTime, setLoadPersonalTime] = useState(false);

    const [priorityOn, setPriorityOn] = useState(false);

    let personalTimeData = useSelector((state)=> state.personalTimeData);
    let timeOnlyData = useSelector(state => state.timeOnlyData);
    let rankOnlyData = useSelector(state => state.rankOnlyData);
    let dispatch = useDispatch();

    const groupCellModal = useSelector(state => state.groupCellModal)

    let [isEdited, setIsEdited] = useState(false);

    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = useSelector(state => state.timeSlots);

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

    const stableTimetableData2 = useMemo(() => {
        if (!timetableData) return null;
        return structuredClone(timetableData);
    }, [timetableData && JSON.stringify(timetableData)]); // 깊은 비교

    const stableTimetableData3 = useMemo(() => {
        if (!timetableData) return null;
        return structuredClone(timetableData);
    }, [timetableData && JSON.stringify(timetableData)]); // 깊은 비교

    const isExistPersonal = checkPersonalTime(stableTimetableData, myUserId);

    const loadCalender = (res) => {
        console.log('로드한 캘린더 데이터', res)

        const newPersonalTimeData = structuredClone(days);

        newPersonalTimeData.forEach((eachDay) => {
            res.forEach((calenderDay) => {
                if (eachDay.date === calenderDay.date) {
                    console.log('일치 적용', eachDay.time, calenderDay.time);
                    eachDay.time = calenderDay.time;
                    eachDay.rank = calenderDay.rank;
                }
            });
        });

        const updatedDays = newPersonalTimeData.map((day) => ({ ...day }));
        setDays(updatedDays);
        dispatch(updatePersonalTimeData(updatedDays))
        setIsEdited(true);
    }

    useEffect(() => {
        console.log('변경된 days useEffect : ', days);
    }, [days]);

    useEffect(() => {
        if (timetableData?.groupTimes) {
            setTimeRange(timetableData.groupTimes);
        }
    }, [timetableData?.groupTimes]);

    useEffect(() => {
        // dispatch(updatePersonalTimeData(returnMyTimeTable(timetableData, myUserId)));
        if (stableTimetableData3) {
            setDays(returnMyTimeTable(stableTimetableData3, myUserId));
        }
    }, [stableTimetableData, myUserId]);


    return (
        <div className="timetable-content">
            <GroupTimetable timetableData={stableTimetableData} timeRange={timeRange}/>
            {loadPersonalTime ?
                <PersonalTimetable days={days} timeRange={timeRange} priorityOn={priorityOn} setEdited={setIsEdited}/>
                : null}

            {groupCellModal ? <GroupCellModal timetableData={stableTimetableData2}/> : null}

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

                            // `${testip}/group/${groupId}/meet/${meetTitle}/add`
                            axios.post(
                                // `http://172.20.10.4:8080/group/${groupId}/when/${meetTitle}/${meetType}/load`, postData,
                                `http://192.168.165.170:8080/group/${groupId}/when/${meetTitle}/${meetType}/load`, null,
                                {
                                    headers:
                                        {
                                            Authorization: `Bearer ${accessToken}`
                                        }
                                }
                            ).then((res) => {
                                console.log(res.data.data.users)
                                // console.log(`캘린더 불러오기 성공 : ${res.data.data.groupTableDTO}`);
                                loadCalender(res.data.data.users);
                                // loadCalender(resData.data.groupTableDTO.days);
                            }).catch((err) => {
                                console.log(`TimetableContent에서 캘린더 불러오기 요청실패 ${err}`);
                            })

                            //dummy 시작
                            // const resData = {
                            //     message: "요청에 성공했습니다.",
                            //     httpStatus: "OK",
                            //     requestId:"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                            //     data: {
                            //         groupTableDTO: {
                            //             groupTimes: "07000900",  // 오전 7시 - 오전 9시
                            //             type: "online",
                            //             days: [
                            //                 {
                            //                    date: "2024-10-09",
                            //                    day: "수요일",
                            //                    time: "101011101010101010101010",  // 15분 단위이므로 2시간일때 8개
                            //                    rank: "000022201010101010101010"
                            //                 },
                            //                 {
                            //                    date: "2024-10-10",
                            //                    day: "목요일",
                            //                    time: "111000001010101010101010",
                            //                    rank: "222000001010101010101010"
                            //                 },
                            //                 {
                            //                    date: "2024-10-11",
                            //                    day: "금요일",
                            //                    time: "101100001010101010101010",
                            //                    rank: "002200001010101010101010"
                            //                 }
                            //             ]
                            //         }
                            //     }
                            // }
                            // loadCalender(resData.data.groupTableDTO.days);
                            //dummy 끝
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
                    dispatch(updatePersonalTimeData(days)); //개인시간표 store state에 저장

                    //API : /group/{groupId}/when/{title}/{type}/add
                    // axios.post(`${testip}/group/${groupId}/when/${meetTitle}/${meetType}/add`, null
                    console.log(`개인시간표 요청 url http://192.168.165.170:8080/group/${groupId}/when/${meetTitle}/${meetType}/add`)
                    axios.post(`http://192.168.165.170:8080/group/${groupId}/when/${meetTitle}/${meetType}/add`, null
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

                    //setBtnColorChange("save-btn")

                    //API : /group/{groupId}/when/{title}/{type}/update

                    dispatch(updateTimeValues(timeOnlyData))
                    dispatch(updateRankValues(rankOnlyData))

                    // console.log("갱신된 timeOnlyData 정보", timeOnlyData);
                    // console.log("갱신된 rankOnlyData 정보", rankOnlyData);
                    // console.log("갱신된 개인시간표 정보", personalTimeData); state변경이 할당한 변수에 안됨.
                    console.log(`저장하기 post update요청 url /group/${groupId}/when/${meetTitle}/${meetType}/update`);
                    console.log("post요청 body : ", store.getState().personalTimeData);

                    // axios.post(`${testip}/group/${groupId}/when/${meetTitle}/${meetType}/update`, myTableData, {
                    axios.post(`http://192.168.165.170:8080/group/${groupId}/when/${meetTitle}/${meetType}/update`, store.getState().personalTimeData, {
                            headers:
                                {
                                    Authorization: `Bearer ${accessToken}`
                                }
                        }
                    ).then((res) => {
                        console.log(res.data);
                        setLoadPersonalTime(true);
                    }).catch((err) => {
                        console.log(`timeTableContent에서 내 시간표 update 요청실패 ${err}`);
                    })
                }
            }}>
                {
                    loadPersonalTime ? <p>저장하기</p> : (
                        isExistPersonal ? <p>내 시간표 수정하기</p> : <p>내 시간표 추가하기</p>

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
                        if (selectedSlot !== null && (meetType === 'ONLINE' || true)) {//이 자리에 장소 결정완료 상태값
                            console.log('슬롯번호 : ',selectedSlot)
                            const doneTime = timeSlots[selectedSlot - 1];
                            const startTime = doneTime.time.slice(0,5) + ':00';
                            console.log(`timeTableContent에서 Done post 요청, /group/${groupId}/when/${meetTitle}/${meetType}/done`);
                            console.log(`post 요청 바디 : ${doneTime.date}T${startTime}`)
                            // axios.post(`${testip}/group/${groupId}/when/${meetTitle}/${meetType}/done`, {
                            axios.post(`http://192.168.165.170:8080/group/${groupId}/when/${meetTitle}/${meetType}/done`, {
                                    meetDT: `${doneTime.date}T${startTime}`
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
    //console.log('개인시간표 불러오기 전 전체 시간표 : ',timetableData, myUserId)
    for (let i = 0; i < timetableData.users.length; i++) {
        if (timetableData.users[i].userId === myUserId) {
            console.log("개인시간표가 있어서 해당 시간표를 로드함.", timetableData.users[i].days);
            return timetableData.users[i].days;
        }
    }
    console.log("개인시간표가 없어서 빈 시간표를 로드함.")
    return createEmptyTimes(timetableData);
}

function checkPersonalTime(timetableData, myUserId) {
    // console.log('checkP', timetableData)
    for (let i = 0; i < timetableData.users.length; i++) {
        if (timetableData.users[i].userId === myUserId) {
            return true;
        }
    }
    return false;
}


export default TimetableContent;