import React, {useState} from 'react';
import './CreateNewMeet.css'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";



function CreateNewMeet() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);
    const [readyToNaming, setReadyToNaming] = useState(false);
    const [newMeetTitle, setNewMeetTitle] = useState('');
    const selectedGroupTimes = useSelector(state => state.selectedGroupTimes);
    const navigate = useNavigate();

    const months = [
        "1월", "2월", "3월", "4월", "5월", "6월",
        "7월", "8월", "9월", "10월", "11월", "12월"
    ];

    const days = ["일", "월", "화", "수", "목", "금", "토"];

    // Get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const prevMonthDays = new Date(year, month, 0).getDate();

        const days = [];

        // 현재 보고 있는 달의 지난 달값
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonthDays - i),
                isCurrentMonth: false
            });
        }

        // 현재 보고 있는 달
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true
            });
        }

        // 현재 보고 있는 달의 다음 달
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false
            });
        }

        return days;
    };

    const changeMonth = (increment) => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + increment)));
    };

    const handleDateClick = (date) => {
        //재선택시 선택해제
        if (selectedDates.some(d => d.getTime() === date.getTime())) {
            setSelectedDates(selectedDates.filter(d => d.getTime() !== date.getTime()));
            return;
        }

        //날짜 순으로 선택날짜배열 정렬
        const newSelectedDates = [...selectedDates, date].sort((a, b) => a - b);

        //7초과 선택인 경우 1개 지우기
        if (newSelectedDates.length > 7) {
            if(date === newSelectedDates[newSelectedDates.length-1]){
                console.log("shift", newSelectedDates.shift());
            }
            else if(date === newSelectedDates[0]){
                console.log("pop", newSelectedDates.pop());
            }
        }
        // 연속한 경우만 체크가능
        const isConsecutive = newSelectedDates.every((date, index) => {
            if (index === 0) return true;
            const prevDate = newSelectedDates[index - 1];
            const diffTime = Math.abs(date - prevDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays === 1;
        });

        //정렬된 배열로 선택날짜 배열 갱신
        if (isConsecutive || newSelectedDates.length === 1) {
            setSelectedDates(newSelectedDates);
        }
    };

    const isDateSelected = (date) => {
        return selectedDates.some(d => d.getTime() === date.getTime());
    };

    const calendarDays = getDaysInMonth(currentDate);

    //빈 시간표 생성함수
    const createNewMeeting = (formatedDate, weekDays) => {
        console.log("createNewMeeting");

        const usersSet = new Array(0);
        const daysSet = new Array(0);

        const groupTimes = selectedGroupTimes;

        function getTimeRange(groupTimes) {
            const startHour = Number.parseInt(groupTimes.slice(0, 4));
            const endHour = Number.parseInt(groupTimes.slice(4));
            const hourRange = endHour - startHour;
            return (hourRange / 100);
        }

        formatedDate.map((date, index)=>{
            daysSet.push({
                date: date,
                day: weekDays[index],
                time: '0'.repeat(getTimeRange(groupTimes)),
                rank: '0'.repeat(getTimeRange(groupTimes)),
            });
        })
        console.log("formatedDAta", daysSet);
        usersSet.push({
            groupTimes: "00000000",

        })

        //입력한 날짜 정보, 시간 정보 전달, 나머지는 빈 상태로 시간표 사용
        const data = {
            groupTimes: "07002100   ", //오전 7시 - 오전 9시 생성 시 입력한 시간
            users: [
                {
                    userId: "emptyTable",
                    days: [
                        {
                            date: "2024-10-09", //입력한 날짜
                            day: "수요일",
                            time: "00000000", //빈 시간표
                            rank: "00000000"
                        },
                        {
                            date: "2024-10-10",
                            day: "목요일",
                            time: "00000000",
                            rank: "00000000"
                        },
                        {
                            date: "2024-10-11",
                            day: "금요일",
                            time: "00000000",
                            rank: "00000000"
                        }
                    ]
                }
            ]
        }
        console.log("미팅리스트에서 createNewMEeting : ", data);
        navigate("/meetings/:id/when/type", {
            state: {timetableData: data} //timetablecontent로
        });
    }

    return (
        <div className="new-meet-calendar">
            <div className="new-meet-header">
                <button className="new-meet-nav-button" onClick={() => changeMonth(-1)}>{"<"}</button>
                <div className="new-meet-month-year">
                    {`${currentDate.getFullYear()}년 ${months[currentDate.getMonth()]}`}
                </div>
                <button className="new-meet-nav-button" onClick={() => changeMonth(1)}>{">"}</button>
            </div>

            <div className="new-meet-days-header">
                {days.map(day => (
                    <div key={day} className="new-meet-day-name">{day}</div>
                ))}
            </div>

            <div className="new-meet-calendar-grid">
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`new-meet-calendar-day ${day.isCurrentMonth ? 'new-meet-current-month' : 'new-meet-other-month'} 
                      ${isDateSelected(day.date) ? 'new-meet-selected' : ''}`}
                        onClick={() => handleDateClick(day.date)}
                    >
                        {day.date.getDate()}
                    </div>
                ))}
            </div>
            <div>
                {readyToNaming ? (<div style={{margin: '20px'}}>
                    <input
                        type="text"
                        className="meeting-name-input"
                        placeholder={"중복되지 않는 회의명을 입력해주세요"}
                        style={{textAlign: 'center'}}
                        onChange={(e)=>{
                            setNewMeetTitle(e.target.value);
                        }}
                        // value={value}
                    />
                </div>) : null}

                {readyToNaming ?
                    (<button className="new-meet-day-button" onClick={() => {
                        //checkDupMeetName(); //기존 회의명과 중복 여부 판단 -> meetID있으면 필요 없는듯?
                        if(newMeetTitle.length > 0 && selectedDates.length > 0){
                            const formatedDate = changeDateFormat(selectedDates)
                            const weekDays = makeDays(selectedDates);
                            console.log("회의 이름 : ", newMeetTitle);
                            console.log("선택한 날짜들 : ", formatedDate);
                            console.log("선택한 날짜들 원본 : ", selectedDates);
                            console.log("요일들 : ", makeDays(selectedDates));
                            createNewMeeting(formatedDate, weekDays);
                        }
                        else{
                            //날짜 추가선택, 회의 이름 입력 안내 -> 팝업? 입력창 border red로?
                        }
                    }
                    }>
                        회의 생성하기
                    </button>) :
                    (<button className="new-meet-day-button" onClick={() => {
                        setReadyToNaming(!readyToNaming);
                    }
                    }>
                        날짜 추가하기
                    </button>)
                }

            </div>

        </div>
    );
}

function makeDays(dateData){
    const newDateData = [...dateData];
    dateData.map((data, index) => {
        newDateData[index] = data.toLocaleDateString("ko-KR", {
                weekday: 'long'
            });
        }
    )
    return newDateData;
}

function changeDateFormat(dateData) {
    const newDateData = [...dateData];
    dateData.map((data, index) => {
            newDateData[index] = formatDate(data);
        }
    )
    return newDateData;
}

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default CreateNewMeet;