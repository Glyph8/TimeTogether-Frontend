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
  const [focusedEvent, setFocusedEvent] = useState(null); //포커스이벤트
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
    // const formattedDate = format(day, "yyyy-MM-dd");
    // const focusedDate = focusedEvent ? focusedEvent.date : null;

    // if (focusedDate && focusedEvent && focusedDate !== formattedDate) {
    //   // 포커스된 게 있을 때 더블클릭한 날짜가 포커스된 날짜와 다를 경우 일정 등록 모달 열기
    //   setEditEvent(null); // 수정 상태 초기화
    //   setModalDate(day);
    //   setIsModalOpen(true); // 등록 모달 열기
    // } else {
    setModalDate(day);
    setIsModalOpen(true);
    // }
  };
  const handleEventClick = (day, event) => {
    // setFocusedEvent(event);
    // setEditEvent(event);
    // setIsEdModalOpen(true);
    setFocusedEvent(event); // 포커스된 이벤트 설정
    setEditEvent(event); // 수정할 이벤트 설정
    setModalDate(day); // 날짜 설정
    setIsModalOpen(true); // 수정 모달 열기
  };

  // const deleteEvent = (date, event) => {
  //   setEvents((prevEvents) => ({
  //     ...prevEvents,
  //     [date]: prevEvents[date].filter((evt) => evt !== event),
  //   }));
  //   closeModal();
  // };
  const deleteEvent = (event) => {
    const { startDate, endDate } = event;

    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };

      if (startDate && endDate) {
        let current = new Date(startDate);
        const end = new Date(endDate);

        while (current <= end) {
          const formattedDate = format(current, "yyyy-MM-dd");
          if (updatedEvents[formattedDate]) {
            updatedEvents[formattedDate] = updatedEvents[formattedDate].filter(
              (evt) => evt !== event
            );
            if (updatedEvents[formattedDate].length === 0) {
              delete updatedEvents[formattedDate];
            }
          }
          current.setDate(current.getDate() + 1);
        }
      } else {
        const formattedDate = format(new Date(event.startDate), "yyyy-MM-dd");
        if (updatedEvents[formattedDate]) {
          updatedEvents[formattedDate] = updatedEvents[formattedDate].filter(
            (evt) => evt !== event
          );
          if (updatedEvents[formattedDate].length === 0) {
            delete updatedEvents[formattedDate];
          }
        }
      }

      return updatedEvents;
    });
    closeModal();
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

  const updateEvent = (updatedEvent) => {
    const { startDate: oldStartDate, endDate: oldEndDate } = editEvent || {}; // 기존 이벤트
    const { startDate: newStartDate, endDate: newEndDate } = updatedEvent; // 수정된 이벤트

    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };

      // 1. 기존 이벤트 범위 삭제
      if (oldStartDate && oldEndDate) {
        let current = new Date(oldStartDate);
        const oldEnd = new Date(oldEndDate);

        while (current <= oldEnd) {
          const formattedDate = format(current, "yyyy-MM-dd");
          if (updatedEvents[formattedDate]) {
            updatedEvents[formattedDate] = updatedEvents[formattedDate].filter(
              (evt) => evt !== editEvent
            );
            if (updatedEvents[formattedDate].length === 0) {
              delete updatedEvents[formattedDate];
            }
          }
          current.setDate(current.getDate() + 1);
        }
      }

      // 2. 새로운 이벤트 범위 추가
      let current = new Date(newStartDate);
      const newEnd = new Date(newEndDate);

      while (current <= newEnd) {
        const formattedDate = format(current, "yyyy-MM-dd");
        if (!updatedEvents[formattedDate]) {
          updatedEvents[formattedDate] = [];
        }
        updatedEvents[formattedDate].push(updatedEvent);
        current.setDate(current.getDate() + 1);
      }

      return updatedEvents;
    });
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
  const hexToRgba = (hex, alpha = 1) => {
    //hex를 rgb로 변경하는 함수
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const calculateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // 시작일~종료일까지의 일수 계산
  };
  const renderCells = () => {
    const rows = [];
    const totalDays = 35;
    const formattedStartDate = format(new Date(startDate), "yyyy-MM-dd"); //연속적인 일정처리
    const formattedEndDate = format(new Date(endDate), "yyyy-MM-dd"); //연속적인 일정처리

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
              style={{
                backgroundColor:
                  focusedEvent === event
                    ? hexToRgba(event.color, 0.1)
                    : event.color,
                color: focusedEvent === event ? event.color : "white",
              }}
              className={`event ${focusedEvent === event ? "focused" : ""}`}
              onDoubleClick={() => handleDateDoubleClick(day, event)}
              onClick={() => handleEventClick(day, event)}
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
          deleteEvent={deleteEvent} // 삭제할 이벤트 전달
        />
      )}
    </div>
  );
}

export default CalendarPage;
