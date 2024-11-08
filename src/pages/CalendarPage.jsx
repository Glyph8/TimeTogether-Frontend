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
import "./CalendarPage.css";

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // 기본값을 오늘 날짜로 설정
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
    setSelectedDate(day); // 클릭한 날짜를 선택한 날짜로 설정
  };

  // 외부 클릭 시 연도/월 선택기 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsYearMonthSelectorOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            {Array.from({ length: 20 }, (_, i) => 2010 + i).map((year) => (
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
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);

        days.push(
          <div
            className={`calendar-day ${
              format(currentDate, "M") !== format(day, "M") ? "disabled" : ""
            } ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
            key={day.getTime()} // 각 날짜 셀에 고유한 key를 부여
            onClick={() => handleDateClick(day)}
          >
            <span className="day-number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-grid">{rows}</div>;
  };

  return (
    <div className="calendar-page">
      {renderHeader()}
      <div className="calendar">
        <div className="calendar-days">{renderDays()}</div>
        {renderCells()}
      </div>
    </div>
  );
}

export default CalendarPage;
