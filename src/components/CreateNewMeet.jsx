import React, { useEffect, useState } from "react";
import "./CreateNewMeet.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const ip = localStorage.getItem("ip");

function CreateNewMeet({ groupId, setMakeNewMeeting }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [readyToNaming, setReadyToNaming] = useState(false);
  const [newMeetTitle, setNewMeetTitle] = useState("");
  const selectedGroupTimes = useSelector((state) => state.selectedGroupTimes);

  const testip = useSelector((state) => state.testip); //test용 백 ip

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const navigate = useNavigate();

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const days = ["일", "월", "화", "수", "목", "금", "토"];

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
        isCurrentMonth: false,
      });
    }

    // 현재 보고 있는 달
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // 현재 보고 있는 달의 다음 달
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const changeMonth = (increment) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + increment))
    );
  };

  const handleDateClick = (date) => {
    //재선택시 선택해제
    if (selectedDates.some((d) => d.getTime() === date.getTime())) {
      setSelectedDates(
        selectedDates.filter((d) => d.getTime() !== date.getTime())
      );
      return;
    }

    //날짜 순으로 선택날짜배열 정렬
    const newSelectedDates = [...selectedDates, date].sort((a, b) => a - b);

    //7초과 선택인 경우 1개 지우기
    if (newSelectedDates.length > 7) {
      if (date === newSelectedDates[newSelectedDates.length - 1]) {
        console.log("shift", newSelectedDates.shift());
      } else if (date === newSelectedDates[0]) {
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
    return selectedDates.some((d) => d.getTime() === date.getTime());
  };

  const calendarDays = getDaysInMonth(currentDate);

  //빈 시간표 생성함수 백엔드 처리로 안쓸듯

  useEffect(() => {}, []);

  return (
    <div className="new-meet-calendar">
      <div className="new-meet-header">
        <button className="new-meet-nav-button" onClick={() => changeMonth(-1)}>
          {"<"}
        </button>
        <div className="new-meet-month-year">
          {`${currentDate.getFullYear()}년 ${months[currentDate.getMonth()]}`}
        </div>
        <button className="new-meet-nav-button" onClick={() => changeMonth(1)}>
          {">"}
        </button>
      </div>

      <div className="new-meet-days-header">
        {days.map((day) => (
          <div key={day} className="new-meet-day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="new-meet-calendar-grid">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`new-meet-calendar-day ${
              day.isCurrentMonth
                ? "new-meet-current-month"
                : "new-meet-other-month"
            } 
                      ${isDateSelected(day.date) ? "new-meet-selected" : ""}`}
            onClick={() => handleDateClick(day.date)}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
      <div>
        {readyToNaming ? (
          <div style={{ margin: "20px" }}>
            <input
              type="text"
              className="meeting-name-input"
              placeholder={"중복되지 않는 회의명을 입력해주세요"}
              style={{ textAlign: "center" }}
              onChange={(e) => {
                setNewMeetTitle(e.target.value);
              }}
              // value={value}
            />
          </div>
        ) : null}

        {readyToNaming ? (
          <button
            className="new-meet-day-button"
            onClick={() => {
              //checkDupMeetName(); //기존 회의명과 중복 여부 판단 -> meetID있으면 필요 없는듯?
              if (newMeetTitle.length > 0 && selectedDates.length > 0) {
                const formatedDate = changeDateFormat(selectedDates);

                console.log(
                  `http://${ip}:8080/group/${groupId}/meet/${newMeetTitle}/add`
                );
                //새 회의 생성 연결 성공
                axios
                  .post(
                    // `${testip}/group/${groupId}/meet/${newMeetTitle}/add`
                    `http://${ip}:8080/group/${groupId}/meet/${newMeetTitle}/add`,
                    formatedDate,
                    {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                      },
                    }
                  )
                  .then((res) => {
                    console.log("요청성공_응답 : ", res.data);
                    setMakeNewMeeting(false);

                    window.reload;
                    // navigate(-1);
                  })
                  .catch((err) => {
                    console.log(
                      `CreateNewMeet에서 회의 리스트 요청실패 ${err}`
                    );
                  });

                //createNewMeeting(formatedDate, weekDays);
              }
            }}
          >
            회의 생성하기
          </button>
        ) : (
          <button
            className="new-meet-day-button"
            onClick={() => {
              setReadyToNaming(!readyToNaming);
            }}
          >
            날짜 추가하기
          </button>
        )}
      </div>
    </div>
  );
}

function makeDays(dateData) {
  const newDateData = [...dateData];
  dateData.map((data, index) => {
    newDateData[index] = data.toLocaleDateString("ko-KR", {
      weekday: "long",
    });
  });
  return newDateData;
}

function changeDateFormat(dateData) {
  const newDateData = [...dateData];
  dateData.map((data, index) => {
    newDateData[index] = formatDate(data);
  });
  return newDateData;
}

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default CreateNewMeet;
