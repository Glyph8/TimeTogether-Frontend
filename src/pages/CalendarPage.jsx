// import React, { useState, useEffect, useRef } from "react";
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   addMonths,
//   subMonths,
//   setMonth,
//   setYear,
//   isSameDay,
// } from "date-fns";
// import "./CalendarPage.css";

// function CalendarPage() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date()); // 기본값을 오늘 날짜로 설정
//   const [isYearMonthSelectorOpen, setIsYearMonthSelectorOpen] = useState(false);
//   const selectorRef = useRef(null);

//   const monthStart = startOfMonth(currentDate);
//   const monthEnd = endOfMonth(monthStart);
//   const startDate = startOfWeek(monthStart);
//   const endDate = endOfWeek(monthEnd);

//   const onNextMonth = () => {
//     setCurrentDate(addMonths(currentDate, 1));
//   };

//   const onPrevMonth = () => {
//     setCurrentDate(subMonths(currentDate, 1));
//   };

//   const toggleYearMonthSelector = () => {
//     setIsYearMonthSelectorOpen(!isYearMonthSelectorOpen);
//   };

//   const handleYearChange = (e) => {
//     setCurrentDate(setYear(currentDate, parseInt(e.target.value)));
//   };

//   const handleMonthChange = (e) => {
//     setCurrentDate(setMonth(currentDate, parseInt(e.target.value) - 1));
//   };

//   const handleDateClick = (day) => {
//     // 현재 월과 클릭한 날짜의 월이 다른 경우 (disabled 클래스가 적용된 날짜)
//     if (format(currentDate, "M") !== format(day, "M")) {
//       // 클릭한 날짜의 월로 이동하고 해당 날짜를 선택
//       setCurrentDate(startOfMonth(day));
//     }
//     // 클릭한 날짜를 선택한 날짜로 설정 (CSS 적용을 위해)
//     setSelectedDate(day);
//     // setSelectedDate(day); // 클릭한 날짜를 selectedDate로 설정
//   };

//   // 외부 클릭 시 연도/월 선택기 닫기
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (selectorRef.current && !selectorRef.current.contains(event.target)) {
//         setIsYearMonthSelectorOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const renderHeader = () => (
//     <div className="calendar-header">
//       <button className="prev-month" onClick={onPrevMonth}>
//         {"<"}
//       </button>
//       <h2 onClick={toggleYearMonthSelector}>
//         {format(currentDate, "yyyy년 MM월")}
//       </h2>
//       <button className="next-month" onClick={onNextMonth}>
//         {">"}
//       </button>
//       {isYearMonthSelectorOpen && (
//         <div className="year-month-selector" ref={selectorRef}>
//           <select
//             value={format(currentDate, "yyyy")}
//             onChange={handleYearChange}
//           >
//             {Array.from({ length: 20 }, (_, i) => 2015 + i).map((year) => (
//               <option key={year} value={year}>
//                 {year}년
//               </option>
//             ))}
//           </select>
//           <select value={format(currentDate, "M")} onChange={handleMonthChange}>
//             {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
//               <option key={month} value={month}>
//                 {month}월
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );

//   const renderDays = () => {
//     const days = ["일", "월", "화", "수", "목", "금", "토"];
//     return days.map((day, index) => (
//       <div key={index} className="calendar-day-header">
//         {day}
//       </div>
//     ));
//   };

//   const renderCells = () => {
//     const rows = [];
//     const totalDays = 35; // 5주(7일 * 5줄)로 그리드를 구성

//     for (let i = 0; i < totalDays; i++) {
//       const day = addDays(startDate, i); // 각 셀이 고유한 날짜를 갖도록 설정
//       const formattedDate = format(day, "d");
//       const isToday = isSameDay(day, new Date());
//       const isSelected = isSameDay(day, selectedDate);

//       rows.push(
//         <div
//           className={`calendar-day ${
//             format(currentDate, "M") !== format(day, "M") ? "disabled" : ""
//           } ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
//           key={day.getTime()}
//           onClick={() => {
//             console.log(day, "click"); // 선택된 날짜 출력
//             handleDateClick(day); // 클릭한 날짜를 selectedDate로 설정
//           }}
//         >
//           <span className="day-number">{formattedDate}</span>
//         </div>
//       );
//     }

//     return (
//       <div className="calendar-grid">
//         <div className="calendar-row">{rows}</div>
//       </div>
//     );
//   };

//   return (
//     <div className="calendar-page">
//       {renderHeader()}
//       <div className="calendar">
//         <div className="calendar-days">{renderDays()}</div>
//         {renderCells()}
//       </div>
//     </div>
//   );
// }

// export default CalendarPage;

import React, { useState, useEffect, useRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  isSameDay,
} from "date-fns";
import CalendarAddModal from "../components/CalendarAddModal";
import "./CalendarPage.css";

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [editEvent, setEditEvent] = useState(null); // 수정할 이벤트 정보
  const [isYearMonthSelectorOpen, setIsYearMonthSelectorOpen] = useState(false);
  const selectorRef = useRef(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const onNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const onPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const toggleYearMonthSelector = () => {
    setIsYearMonthSelectorOpen(!isYearMonthSelectorOpen);
  };

  const handleYearChange = (e) => {
    setCurrentDate(setYear(currentDate, parseInt(e.target.value)));
  };

  const handleMonthChange = (e) => {
    setCurrentDate(setMonth(currentDate, parseInt(e.target.value) - 1));
  };

  const handleDateClick = (day) => {
    if (format(currentDate, "M") !== format(day, "M")) {
      setCurrentDate(startOfMonth(day));
    }
    setSelectedDate(day);
  };

  const handleDateDoubleClick = (day, event = null) => {
    setModalDate(day);
    setEditEvent(event); // 수정할 이벤트를 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalDate(null);
    setEditEvent(null);
  };

  const addEvent = (date, event) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: [...(prevEvents[date] || []), event],
    }));
    closeModal();
  };

  const updateEvent = (date, updatedEvent) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: prevEvents[date].map((evt) =>
        evt === editEvent ? updatedEvent : evt
      ),
    }));
    closeModal();
  };

  const renderHeader = () => (
    <div className="calendar-header">
      <button className="prev-month" onClick={onPrevMonth}>
        {"<"}
      </button>
      <h2 onClick={toggleYearMonthSelector}>
        {format(currentDate, "yyyy년 MM월")}
      </h2>
      <button className="next-month" onClick={onNextMonth}>
        {">"}
      </button>
      {isYearMonthSelectorOpen && (
        <div className="year-month-selector" ref={selectorRef}>
          <select
            value={format(currentDate, "yyyy")}
            onChange={handleYearChange}
          >
            {Array.from({ length: 20 }, (_, i) => 2015 + i).map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <select value={format(currentDate, "M")} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  const renderDays = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days.map((day, index) => (
      <div key={index} className="calendar-day-header">
        {day}
      </div>
    ));
  };

  const renderCells = () => {
    const rows = [];
    const totalDays = 35;

    for (let i = 0; i < totalDays; i++) {
      const day = addDays(startDate, i);
      const formattedDate = format(day, "yyyy-MM-dd");
      const isToday = isSameDay(day, new Date());
      const isSelected = isSameDay(day, selectedDate);
      const dayEvents = events[formattedDate] || [];

      rows.push(
        <div
          className={`calendar-day ${
            format(currentDate, "M") !== format(day, "M") ? "disabled" : ""
          } ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
          key={day.getTime()}
          onClick={() => handleDateClick(day)}
          onDoubleClick={() => handleDateDoubleClick(day)}
        >
          <span className="day-number">{format(day, "d")}</span>
          {dayEvents.map((event, index) => (
            <div
              key={index}
              style={{ backgroundColor: event.color }}
              className="event"
              onDoubleClick={() => handleDateDoubleClick(day, event)}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        <div className="calendar-row">{rows}</div>
      </div>
    );
  };

  return (
    <div className="calendar-page">
      {renderHeader()}
      <div className="calendar">
        <div className="calendar-days">{renderDays()}</div>
        {renderCells()}
      </div>
      {isModalOpen && (
        <CalendarAddModal
          date={modalDate}
          addEvent={addEvent}
          updateEvent={updateEvent}
          closeModal={closeModal}
          editEvent={editEvent} // 수정할 이벤트 전달
        />
      )}
    </div>
  );
}

export default CalendarPage;
