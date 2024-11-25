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
// import CalendarAddModal from "../components/CalendarAddModal";
// import "./CalendarPage.css";

// function CalendarPage() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [events, setEvents] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [modalDate, setModalDate] = useState(null);
//   const [editEvent, setEditEvent] = useState(null); // 수정할 이벤트 정보
//   const [isYearMonthSelectorOpen, setIsYearMonthSelectorOpen] = useState(false);
//   const [focusedEvent, setFocusedEvent] = useState(null); //포커스이벤트
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
//     setIsYearMonthSelectorOpen(false); // 선택 완료 후 닫기
//   };

//   const handleMonthChange = (e) => {
//     setCurrentDate(setMonth(currentDate, parseInt(e.target.value) - 1));
//     setIsYearMonthSelectorOpen(false); // 선택 완료 후 닫기
//   };
//   const handleOutsideClick = (e) => {
//     // 클릭한 곳이 날짜 선택 창 내부가 아니면 창 닫기
//     if (
//       isYearMonthSelectorOpen &&
//       selectorRef.current &&
//       !selectorRef.current.contains(e.target)
//     ) {
//       setIsYearMonthSelectorOpen(false);
//     }
//   };
//   useEffect(() => {
//     // 외부 클릭 이벤트 추가
//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       // 컴포넌트 언마운트 시 이벤트 제거
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [isYearMonthSelectorOpen]);

//   const handleDateClick = (day) => {
//     if (format(currentDate, "M") !== format(day, "M")) {
//       setCurrentDate(startOfMonth(day));
//     }
//     setSelectedDate(day);
//   };

//   const handleDateDoubleClick = (day, event = null) => {
//     // const formattedDate = format(day, "yyyy-MM-dd");
//     // const focusedDate = focusedEvent ? focusedEvent.date : null;

//     // if (focusedDate && focusedEvent && focusedDate !== formattedDate) {
//     //   // 포커스된 게 있을 때 더블클릭한 날짜가 포커스된 날짜와 다를 경우 일정 등록 모달 열기
//     //   setEditEvent(null); // 수정 상태 초기화
//     //   setModalDate(day);
//     //   setIsModalOpen(true); // 등록 모달 열기
//     // } else {
//     setModalDate(day);
//     setIsModalOpen(true);
//     // }
//   };
//   const handleEventClick = (day, event) => {
//     // setFocusedEvent(event);
//     // setEditEvent(event);
//     // setIsEdModalOpen(true);
//     setFocusedEvent(event); // 포커스된 이벤트 설정
//     setEditEvent(event); // 수정할 이벤트 설정
//     setModalDate(day); // 날짜 설정
//     setIsModalOpen(true); // 수정 모달 열기
//   };

//   // const deleteEvent = (date, event) => {
//   //   setEvents((prevEvents) => ({
//   //     ...prevEvents,
//   //     [date]: prevEvents[date].filter((evt) => evt !== event),
//   //   }));
//   //   closeModal();
//   // };
//   const deleteEvent = (event) => {
//     const { startDate, endDate } = event;

//     setEvents((prevEvents) => {
//       const updatedEvents = { ...prevEvents };

//       if (startDate && endDate) {
//         let current = new Date(startDate);
//         const end = new Date(endDate);

//         while (current <= end) {
//           const formattedDate = format(current, "yyyy-MM-dd");
//           if (updatedEvents[formattedDate]) {
//             updatedEvents[formattedDate] = updatedEvents[formattedDate].filter(
//               (evt) => evt !== event
//             );
//             if (updatedEvents[formattedDate].length === 0) {
//               delete updatedEvents[formattedDate];
//             }
//           }
//           current.setDate(current.getDate() + 1);
//         }
//       } else {
//         const formattedDate = format(new Date(event.startDate), "yyyy-MM-dd");
//         if (updatedEvents[formattedDate]) {
//           updatedEvents[formattedDate] = updatedEvents[formattedDate].filter(
//             (evt) => evt !== event
//           );
//           if (updatedEvents[formattedDate].length === 0) {
//             delete updatedEvents[formattedDate];
//           }
//         }
//       }

//       return updatedEvents;
//     });
//     closeModal();
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalDate(null);
//     setEditEvent(null);
//   };

//   const addEvent = (date, event) => {
//     setEvents((prevEvents) => ({
//       ...prevEvents,
//       [date]: [...(prevEvents[date] || []), event],
//     }));
//     closeModal();
//   };

//   const updateEvent = (updatedEvent) => {
//     const { startDate: oldStartDate, endDate: oldEndDate } = editEvent || {}; // 기존 이벤트
//     const { startDate: newStartDate, endDate: newEndDate } = updatedEvent; // 수정된 이벤트

//     setEvents((prevEvents) => {
//       const updatedEvents = { ...prevEvents };

//       // 1. 기존 이벤트 범위 삭제
//       if (oldStartDate && oldEndDate) {
//         let current = new Date(oldStartDate);
//         const oldEnd = new Date(oldEndDate);

//         while (current <= oldEnd) {
//           const formattedDate = format(current, "yyyy-MM-dd");
//           if (updatedEvents[formattedDate]) {
//             updatedEvents[formattedDate] = updatedEvents[formattedDate].filter(
//               (evt) => evt !== editEvent
//             );
//             if (updatedEvents[formattedDate].length === 0) {
//               delete updatedEvents[formattedDate];
//             }
//           }
//           current.setDate(current.getDate() + 1);
//         }
//       }

//       // 2. 새로운 이벤트 범위 추가
//       let current = new Date(newStartDate);
//       const newEnd = new Date(newEndDate);

//       while (current <= newEnd) {
//         const formattedDate = format(current, "yyyy-MM-dd");
//         if (!updatedEvents[formattedDate]) {
//           updatedEvents[formattedDate] = [];
//         }
//         updatedEvents[formattedDate].push(updatedEvent);
//         current.setDate(current.getDate() + 1);
//       }

//       return updatedEvents;
//     });
//     closeModal();
//   };

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
//   const hexToRgba = (hex, alpha = 1) => {
//     //hex를 rgb로 변경하는 함수
//     const r = parseInt(hex.slice(1, 3), 16);
//     const g = parseInt(hex.slice(3, 5), 16);
//     const b = parseInt(hex.slice(5, 7), 16);
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//   };
//   const calculateDateRange = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // 시작일~종료일까지의 일수 계산
//   };
//   const renderCells = () => {
//     const rows = [];
//     const totalDays = 35;
//     const formattedStartDate = format(new Date(startDate), "yyyy-MM-dd"); //연속적인 일정처리
//     const formattedEndDate = format(new Date(endDate), "yyyy-MM-dd"); //연속적인 일정처리

//     for (let i = 0; i < totalDays; i++) {
//       const day = addDays(startDate, i);
//       const formattedDate = format(day, "yyyy-MM-dd");
//       const isToday = isSameDay(day, new Date());
//       const isSelected = isSameDay(day, selectedDate);
//       const dayEvents = events[formattedDate] || [];

//       rows.push(
//         <div
//           className={`calendar-day ${
//             format(currentDate, "M") !== format(day, "M") ? "disabled" : ""
//           } ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
//           key={day.getTime()}
//           onClick={() => handleDateClick(day)}
//           onDoubleClick={() => handleDateDoubleClick(day)}
//         >
//           <span className="day-number">{format(day, "d")}</span>
//           {dayEvents.map((event, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundColor:
//                   focusedEvent === event
//                     ? hexToRgba(event.color, 0.1)
//                     : event.color,
//                 color: focusedEvent === event ? event.color : "white",
//               }}
//               className={`event ${focusedEvent === event ? "focused" : ""}`}
//               onDoubleClick={() => handleDateDoubleClick(day, event)}
//               onClick={() => handleEventClick(day, event)}
//             >
//               {event.title}
//             </div>
//           ))}
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
//       {isModalOpen && (
//         <CalendarAddModal
//           date={modalDate}
//           addEvent={addEvent}
//           updateEvent={updateEvent}
//           closeModal={closeModal}
//           editEvent={editEvent} // 수정할 이벤트 전달
//           deleteEvent={deleteEvent} // 삭제할 이벤트 전달
//         />
//       )}
//     </div>
//   );
// }

// export default CalendarPage;
// 백엔드 연결 전 코드 (삭제하지말기)

//백엔드코드 작성
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
import axios from "axios";
const accessToken = localStorage.getItem("accessToken");

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

  // 월별 일정 불러오기
  const loadEventsForMonth = async () => {
    const year = format(currentDate, "yyyy");
    const month = format(currentDate, "MM");

    try {
      const response = await axios.get(
        `http://172.20.10.4:8080/calendar/view/${year}/${month}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);
      // const { meetingList } = response.data.data;
      const { e, l } = response.data.data; // 응답에서 e와 l 추출
      const { meetingList } = e; // e 안의 meetingList 추출
      console.log("view 요청 성공", meetingList, l);
      // console.log("view 요청성공");
      // l 배열을 meetingId를 키로 하는 맵으로 변환
      const locationMap = {};
      l.forEach((location) => {
        locationMap[location.meetingId] = {
          locationName: location.locationName || "장소없음",
          locationUrl: location.locationUrl || "url없음",
        };
      });
      console.log(meetingList);

      const newEvents = {};
      meetingList.forEach((meeting) => {
        const isAllDay = meeting.meetDTstart.endsWith("T00:00:00");
        const startDate = format(new Date(meeting.meetDTstart), "yyyy-MM-dd");
        const endDate = format(new Date(meeting.meetDTend), "yyyy-MM-dd");
        const colors = [
          "#FDBAAB",
          "#FEA666",
          "#FFC553",
          "#b790eb",
          "#9747FF",
          "#3B4FFF",
        ];
        const groupId = meeting.id; // 그룹 ID
        const color = colors[groupId % colors.length]; // ID 기반으로 색상 선택
        // const meetType = meeting.meetType;
        const meetType = "ONLINE";
        // locationMap에서 meeting.id로 location 정보 찾기
        const locationInfo = locationMap[meeting.id] || {};
        const locationName = locationInfo.locationName;
        const locationUrl = locationInfo.locationUrl;

        let current = new Date(startDate);
        const end = new Date(endDate);

        while (current <= end) {
          const formattedDate = format(current, "yyyy-MM-dd");
          if (!newEvents[formattedDate]) {
            newEvents[formattedDate] = [];
          }
          newEvents[formattedDate].push({
            id: meeting.id, // 수정 및 삭제 요청에 사용
            title: meeting.meetTitle,
            content: meeting.meetContent,
            location: locationName, // 병합된 locationName
            locationUrl, // 병합된 locationUrl

            meetType: "ONLINE",

            groupName: meeting.groupName || "그룹명 없음", // 그룹 이름
            isAllDay,
            startDate,
            endDate,
            // color:
            //   meeting.color ||
            //   [
            //     "#FDBAAB",
            //     "#FEA666",
            //     "#FFC553",
            //     "#b790eb",
            //     "#9747FF",
            //     "#3B4FFF",
            //   ][Math.floor(Math.random() * 6)],
            color,
          });
          current.setDate(current.getDate() + 1);
        }
      });

      setEvents(newEvents);
    } catch (error) {
      console.error("Failed to load events:", error);
      alert("월별 일정 불러오기에 실패했습니다.");
    }
  };
  const refreshCalendar = () => {
    loadEventsForMonth(); // 월별 일정을 다시 불러옵니다.
  };

  useEffect(() => {
    loadEventsForMonth();
  }, [currentDate]);

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
    setIsYearMonthSelectorOpen(false); // 선택 완료 후 닫기
  };

  const handleMonthChange = (e) => {
    setCurrentDate(setMonth(currentDate, parseInt(e.target.value) - 1));
    setIsYearMonthSelectorOpen(false); // 선택 완료 후 닫기
  };
  const handleOutsideClick = (e) => {
    // 클릭한 곳이 날짜 선택 창 내부가 아니면 창 닫기
    if (
      isYearMonthSelectorOpen &&
      selectorRef.current &&
      !selectorRef.current.contains(e.target)
    ) {
      setIsYearMonthSelectorOpen(false);
    }
  };
  useEffect(() => {
    // 외부 클릭 이벤트 추가
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 제거
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isYearMonthSelectorOpen]);

  const handleDateDoubleClick = (day) => {
    setModalDate(day);
    setIsModalOpen(true);
    setEditEvent(null); // 신규 일정 등록
  };

  const handleDateClick = (day) => {
    if (format(currentDate, "M") !== format(day, "M")) {
      setCurrentDate(startOfMonth(day));
    }
    setSelectedDate(day);
  };

  const handleEventClick = (day, event) => {
    setFocusedEvent(event); // 포커스된 이벤트 설정
    console.log("Selected Event for Edit:", event);
    setEditEvent(event); // 수정할 이벤트 설정
    setModalDate(day); // 날짜 설정
    // 연속 일정의 모든 날짜를 포커스
    const { startDate, endDate } = event;
    if (startDate && endDate) {
      let current = new Date(startDate);
      const end = new Date(endDate);

      while (current <= end) {
        const formattedDate = format(current, "yyyy-MM-dd");
        if (events[formattedDate]) {
          events[formattedDate] = events[formattedDate].map((evt) =>
            evt === event ? { ...evt, focused: true } : evt
          );
        }
        current.setDate(current.getDate() + 1);
      }
      setEvents({ ...events }); // 상태 업데이트
    }
    setIsModalOpen(true); // 수정 모달 열기
  };

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
          refreshCalendar={refreshCalendar} // 캘린더 새로고침 함수 전달
        />
      )}
    </div>
  );
}

export default CalendarPage;
