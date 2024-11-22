// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import "./CalendarAddModal.css";
// import { FaTrash } from "react-icons/fa";

// function CalendarAddModal({
//   date,
//   addEvent,
//   updateEvent,
//   closeModal,
//   editEvent,
//   deleteEvent,
// }) {
//   const [title, setTitle] = useState("");
//   const [location, setLocation] = useState("");
//   const [content, setContent] = useState("");
//   const [color, setColor] = useState("#f5a623");
//   const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

//   const [isTimeEnabled, setIsTimeEnabled] = useState(false); // 시간 설정 여부
//   const [startDate, setStartDate] = useState(format(date, "yyyy-MM-dd")); // 시작 날짜
//   const [endDate, setEndDate] = useState(format(date, "yyyy-MM-dd")); // 종료 날짜
//   const [startTime, setStartTime] = useState("00:00"); // 시작 시간
//   const [endTime, setEndTime] = useState("23:59"); // 종료 시간

//   // editEvent가 있을 때 초기값을 설정
//   useEffect(() => {
//     // if (editEvent) {
//     //   setTitle(editEvent.title);
//     //   setLocation(editEvent.location);
//     //   setContent(editEvent.content);
//     //   setColor(editEvent.color);
//     // } else {
//     //   // editEvent가 없을 때는 빈 값으로 초기화
//     //   setTitle("");
//     //   setLocation("");
//     //   setContent("");
//     //   setColor("#FFC553");
//     // }
//     if (editEvent) {
//       setTitle(editEvent.title || ""); // 제목 초기화
//       setLocation(editEvent.location || ""); // 장소 초기화
//       setContent(editEvent.content || ""); // 내용 초기화
//       setColor(editEvent.color || "#FFC553"); // 색상 초기화

//       // 날짜 초기화
//       setStartDate(editEvent.startDate || format(new Date(), "yyyy-MM-dd"));
//       setEndDate(editEvent.endDate || format(new Date(), "yyyy-MM-dd"));

//       // 시간 설정 여부 초기화
//       setIsTimeEnabled(!!editEvent.time); // time이 있으면 true, 없으면 false

//       // 시간 초기화
//       if (editEvent.time) {
//         const [start, end] = editEvent.time.split(" - "); // "HH:mm - HH:mm" 형식 분리
//         setStartTime(start || "00:00");
//         setEndTime(end || "23:59");
//       } else {
//         setStartTime("00:00");
//         setEndTime("23:59");
//       }
//     } else {
//       // 새 일정 추가 시 초기화
//       setTitle("");
//       setLocation("");
//       setContent("");
//       setColor("#FFC553");
//       setStartDate(format(date, "yyyy-MM-dd"));
//       setEndDate(format(date, "yyyy-MM-dd"));
//       setIsTimeEnabled(false);
//       setStartTime("00:00");
//       setEndTime("23:00");
//     }
//   }, [editEvent]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const eventTitle = title.trim() === "" ? "새로운 일정" : title;
//     const eventLocation = location.trim() === "" ? "장소없음" : location;
//     const eventContent = content.trim() === "" ? "내용 없음" : content;

//     const updatedEvent = {
//       title: eventTitle,
//       location: eventLocation,
//       content: eventContent,
//       color,
//       time: isTimeEnabled ? `${startTime} - ${endTime}` : null,
//       startDate,
//       endDate,
//     };

//     if (editEvent) {
//       // 수정 이벤트 처리
//       updateEvent(updatedEvent);
//     } else {
//       // 새 이벤트 추가
//       if (startDate === endDate) {
//         addEvent(format(new Date(startDate), "yyyy-MM-dd"), updatedEvent);
//       } else {
//         let current = new Date(startDate);
//         const end = new Date(endDate);

//         while (current <= end) {
//           addEvent(format(current, "yyyy-MM-dd"), updatedEvent);
//           current.setDate(current.getDate() + 1);
//         }
//       }
//     }
//     closeModal();
//   };

//   const colors = [
// "#FDBAAB",
// "#FEA666",
// "#FFC553",
// // "#A26AF0",
// "#b790eb",
// "#9747FF",
// "#3B4FFF",
//   ];

//   return (
//     <div className="cm-modal-overlay" onClick={closeModal}>
//       <div className="cm-modal-content" onClick={(e) => e.stopPropagation()}>
//         <h2>
//           <span
//             style={{ backgroundColor: color }}
//             className="cm-color-circle"
//             onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
//           ></span>
//           {format(date, "MM월 dd일")}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {isColorPickerOpen && (
//             <div className="cm-color-picker">
//               {colors.map((c) => (
//                 <span
//                   key={c}
//                   style={{
//                     backgroundColor: c,
//                     border: color === c ? "2px solid black" : "none",
//                   }}
//                   onClick={() => {
//                     setColor(c);
//                     setIsColorPickerOpen(false);
//                   }}
//                   className="cm-color-option"
//                 />
//               ))}
//             </div>
//           )}
//           <input
//             className="oi"
//             type="text"
//             placeholder="제목"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             className="oi"
//             type="text"
//             placeholder="장소"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//           <div className="timeSetting">
//             <div className="time-toggle">
//               <label>
//                 <span
//                   className="tstxt"
//                   style={{
//                     color: isTimeEnabled ? "#a26af0" : "#ccc", // 체크 상태에 따라 색상 변경
//                   }}
//                 >
//                   시간 설정
//                 </span>
//                 <input
//                   type="checkbox"
//                   checked={isTimeEnabled}
//                   onChange={(e) => setIsTimeEnabled(e.target.checked)}
//                 />
//               </label>
//             </div>
//             <div className="date-time-settings">
//               <div className="inline-inputs">
//                 <div>
//                   <input
//                     className="sd"
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <input
//                     className="ed"
//                     type="date"
//                     value={endDate}
//                     style={{
//                       color: startDate === endDate ? "#ccc" : "black", // 조건부 스타일링
//                     }}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {isTimeEnabled && (
//                 <div className="inline-inputs">
//                   <div>
//                     <input
//                       className="st"
//                       type="time"
//                       value={startTime}
//                       onChange={(e) => setStartTime(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <input
//                       className="et"
//                       type="time"
//                       value={endTime}
//                       onChange={(e) => setEndTime(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <textarea
//             className="oii"
//             placeholder="내용"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows="4" // 세로 크기 (행 수)
//             cols="12" // 가로 크기 (열 수)
//           />
//           {/* <input
//             type="text"
//             placeholder="내용"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           /> */}

//           <button className="cm-button" type="submit">
//             {editEvent ? "수정" : "일정 추가"}
//           </button>
//           {/* {editEvent && (
//             <FaTrash
//               className="ca-delete-button"
//               title="Delete"
//               onClick={() => deleteEvent(format(date, "yyyy-MM-dd"), editEvent)}
//             />
//             //    <button
//             //    type="button"
//             //    onClick={() => deleteEvent(format(date, "yyyy-MM-dd"), editEvent)}
//             //    className="ca-delete-button"
//             //  >
//             //    삭제
//             //  </button>
//           )} */}
//           {editEvent && (
//             <FaTrash
//               className="ca-delete-button"
//               title="Delete"
//               onClick={() => deleteEvent(editEvent)} // event 전체 전달
//             />
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CalendarAddModal;

//토글을 시간설정 말고, 하루종일로 바꿈.
// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import "./CalendarAddModal.css";
// import { FaTrash } from "react-icons/fa";

// function CalendarAddModal({
//   date,
//   addEvent,
//   updateEvent,
//   closeModal,
//   editEvent,
//   deleteEvent,
// }) {
//   const [title, setTitle] = useState("");
//   const [location, setLocation] = useState("");
//   const [content, setContent] = useState("");
//   const [color, setColor] = useState("#f5a623");
//   const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

//   const [isAllDay, setIsAllDay] = useState(false); // '하루 종일' 여부
//   const [startDate, setStartDate] = useState(format(date, "yyyy-MM-dd")); // 시작 날짜
//   const [endDate, setEndDate] = useState(format(date, "yyyy-MM-dd")); // 종료 날짜
//   const [startTime, setStartTime] = useState("11:00"); // 시작 시간
//   const [endTime, setEndTime] = useState("23:00"); // 종료 시간

//   useEffect(() => {
//     if (editEvent) {
//       setTitle(editEvent.title || ""); // 제목 초기화
//       setLocation(editEvent.location || ""); // 장소 초기화
//       setContent(editEvent.content || ""); // 내용 초기화
//       setColor(editEvent.color || "#FFC553"); // 색상 초기화

//       // 날짜 초기화
//       setStartDate(editEvent.startDate || format(new Date(), "yyyy-MM-dd"));
//       setEndDate(editEvent.endDate || format(new Date(), "yyyy-MM-dd"));

//       // 하루 종일 여부 초기화
//       setIsAllDay(editEvent.isAllDay || false);

//       // 시간 초기화
//       if (editEvent.time) {
//         const [start, end] = editEvent.time.split(" - "); // "HH:mm - HH:mm" 형식 분리
//         setStartTime(start || "11:00");
//         setEndTime(end || "23:00");
//       } else {
//         setStartTime("11:00");
//         setEndTime("23:00");
//       }
//     } else {
//       // 새 일정 추가 시 초기화
//       setTitle("");
//       setLocation("");
//       setContent("");
//       setColor("#FFC553");
//       setStartDate(format(date, "yyyy-MM-dd"));
//       setEndDate(format(date, "yyyy-MM-dd"));
//       setIsAllDay(false);
//       setStartTime("11:00");
//       setEndTime("23:00");
//     }
//   }, [editEvent]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const eventTitle = title.trim() === "" ? "새로운 일정" : title;
//     const eventLocation = location.trim() === "" ? "장소없음" : location;
//     const eventContent = content.trim() === "" ? "내용 없음" : content;

//     const updatedEvent = {
//       title: eventTitle,
//       location: eventLocation,
//       content: eventContent,
//       color,
//       isAllDay,
//       time: isAllDay ? null : `${startTime} - ${endTime}`,
//       startDate,
//       endDate,
//     };

//     if (editEvent) {
//       updateEvent(updatedEvent);
//     } else {
//       if (startDate === endDate) {
//         addEvent(format(new Date(startDate), "yyyy-MM-dd"), updatedEvent);
//       } else {
//         let current = new Date(startDate);
//         const end = new Date(endDate);

//         while (current <= end) {
//           addEvent(format(current, "yyyy-MM-dd"), updatedEvent);
//           current.setDate(current.getDate() + 1);
//         }
//       }
//     }
//     closeModal();
//   };

//   const colors = [
//     "#FDBAAB",
//     "#FEA666",
//     "#FFC553",
//     "#b790eb",
//     "#9747FF",
//     "#3B4FFF",
//   ];

//   return (
//     <div className="cm-modal-overlay" onClick={closeModal}>
//       <div className="cm-modal-content" onClick={(e) => e.stopPropagation()}>
//         <h2>
//           <span
//             style={{ backgroundColor: color }}
//             className="cm-color-circle"
//             onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
//           ></span>
//           {format(date, "MM월 dd일")}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {isColorPickerOpen && (
//             <div className="cm-color-picker">
//               {colors.map((c) => (
//                 <span
//                   key={c}
//                   style={{
//                     backgroundColor: c,
//                     border: color === c ? "2px solid black" : "none",
//                   }}
//                   onClick={() => {
//                     setColor(c);
//                     setIsColorPickerOpen(false);
//                   }}
//                   className="cm-color-option"
//                 />
//               ))}
//             </div>
//           )}
//           <input
//             className="oi"
//             type="text"
//             placeholder="제목"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             className="oi"
//             type="text"
//             placeholder="장소"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//           <div className="timeSetting">
//             <div className="time-toggle">
//               <label>
//                 <span
//                   className="tstxt"
//                   style={{
//                     color: isAllDay ? "#a26af0" : "#ccc", // 체크 상태에 따라 색상 변경
//                   }}
//                 >
//                   하루 종일
//                 </span>
//                 <input
//                   type="checkbox"
//                   checked={isAllDay}
//                   onChange={(e) => setIsAllDay(e.target.checked)}
//                 />
//               </label>
//             </div>

//             <div className="date-time-settings">
//               <div className="inline-inputs">
//                 <div>
//                   <input
//                     className="sd"
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <input
//                     className="ed"
//                     type="date"
//                     value={endDate}
//                     style={{
//                       color: startDate === endDate ? "#ccc" : "black", // 조건부 스타일링
//                     }}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {!isAllDay && (
//                 <div className="inline-inputs">
//                   <div>
//                     <input
//                       className="st"
//                       type="time"
//                       value={startTime}
//                       onChange={(e) => setStartTime(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <input
//                       className="et"
//                       type="time"
//                       value={endTime}
//                       onChange={(e) => setEndTime(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <textarea
//             className="oii"
//             placeholder="내용"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows="4"
//             cols="12"
//           />
//           <button className="cm-button" type="submit">
//             {editEvent ? "수정" : "일정 추가"}
//           </button>
//           {editEvent && (
//             <FaTrash
//               className="ca-delete-button"
//               title="Delete"
//               onClick={() => deleteEvent(editEvent)}
//             />
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CalendarAddModal;
//백엔드 연결 전 코드 (삭제하지말기)

//백연결 코드 작성

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import "./CalendarAddModal.css";
import { FaTrash } from "react-icons/fa";

function CalendarAddModal({
  date,
  addEvent,
  updateEvent,
  closeModal,
  editEvent,
  refreshCalendar,
}) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [groupId, setGroupId] = useState(""); // 그룹 id
  const [groupName, setGroupName] = useState(""); // 그룹 이름 (문자열, 사용자 수정 가능)
  const [locationUrl, setLocationUrl] = useState(""); // 장소 URL 추가
  const [meetType, setMeetType] = useState(null);
  const [color, setColor] = useState("#FDBAAB");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [startDate, setStartDate] = useState(format(date, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(date, "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState("11:00");
  const [endTime, setEndTime] = useState("23:00");

  const colors = [
    "#FDBAAB",
    "#FEA666",
    "#FFC553",
    "#b790eb",
    "#9747FF",
    "#3B4FFF",
  ];

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title || "제목없음");
      setLocation(editEvent.location || "장소없음");
      setContent(editEvent.content || "내용없음");
      setGroupId(editEvent.groupId || ""); // 그룹 ID 초기화
      setGroupName(editEvent.groupName || ""); // 그룹 이름 초기화
      setLocationUrl(editEvent.locationUrl || "");
      setMeetType(editEvent.meetType || null);
      setColor(
        editEvent.color || colors[Math.floor(Math.random() * colors.length)]
      );
      setStartDate(editEvent.startDate || format(new Date(), "yyyy-MM-dd"));
      setEndDate(editEvent.endDate || format(new Date(), "yyyy-MM-dd"));
      setIsAllDay(editEvent.isAllDay || false);
      if (editEvent.time) {
        const [start, end] = editEvent.time.split(" - ");
        setStartTime(start || "11:00");
        setEndTime(end || "23:00");
      } else {
        setStartTime("11:00");
        setEndTime("23:00");
      }
    }
  }, [editEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartTime = isAllDay ? "T00:00:00" : `T${startTime}:00`;
    const formattedEndTime = isAllDay ? "T00:00:00" : `T${endTime}:00`;

    const eventData1 = {
      //일정등록할때 보낼 포맷
      // meetingId: editEvent?.id || null,
      meetTitle: title.trim() || "새로운 일정",
      meetContent: content.trim() || "내용 없음",
      meetType: "ONLINE",
      meetDTstart: `${startDate}${formattedStartTime}`,
      meetDTend: `${endDate}${formattedEndTime}`,
      groupName: editEvent?.groupName || "", // 개인일정에서는 그룹이름 없음.(사용자는 수정불가)
      locationName: location.trim() || "장소없음",
      locationUrl: locationUrl.trim() || "url 없음",
      // groupId: groupId.trim() || "미설정",
      //groupId: groupId || null, // 그룹 ID를 요청에 포함
      //groupName: groupName.trim() || "", // 개인일정에서는 그룹이름 없음.(사용자는 수정불가)
      // color,
    };
    const eventData2 = {
      //일정수정할때 보낼 포맷
      // meetingId: editEvent?.id || null,
      meetTitle: title.trim() || "새로운 일정",
      meetContent: content.trim() || "내용 없음",
      // meetType: null,
      meetType: meetType.trim(),
      meetDTstart: `${startDate}${formattedStartTime}`,
      meetDTend: `${endDate}${formattedEndTime}`,
      groupName: groupName.trim() || "", // 사용자 수정 불가능한 그룹 이름
      locationName: location.trim() || "장소없음",
      locationUrl: locationUrl.trim() || "url 없음",
      // groupId: groupId.trim() || "미설정",
      //groupId: groupId || null, // 그룹 ID를 요청에 포함
      // groupName: groupName.trim() || "", // 사용자 수정 가능한 그룹 이름
      // color,
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (editEvent) {
        const response = await axios.patch(
          `http://192.168.186.162:8080/calendar/update/${editEvent.id}`,
          eventData2,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("보낸내용: ", eventData2);
        console.log("일정수정에 대한 백엔드 응답:", response.data);
      } else {
        console.log("보낸내용: ", eventData1);
        const response = await axios.post(
          `http://192.168.186.162:8080/calendar/create`,
          eventData1,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("일정등록에 대한 백엔드 응답", response.data);
      }

      closeModal();
      refreshCalendar();
    } catch (error) {
      console.error(
        editEvent ? "Failed to update event:" : "Failed to add event:",
        error
      );
      alert(
        editEvent ? "일정 수정에 실패했습니다." : "일정 등록에 실패했습니다."
      );
    }
  };

  const handleDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!editEvent?.id) return;
    try {
      const response = await axios.delete(
        `http://192.168.186.162:8080/calendar/delete/${editEvent.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: { meetId: editEvent.id },
        }
      );
      console.log("Delete Event Response:", response.data);
      closeModal();
      refreshCalendar();
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("일정 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="cm-modal-overlay" onClick={closeModal}>
      <div className="cm-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          <span
            style={{ backgroundColor: color }}
            className="cm-color-circle"
            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          ></span>
          {format(date, "MM월 dd일")}
        </h2>

        <form onSubmit={handleSubmit}>
          {isColorPickerOpen && (
            <div className="cm-color-picker">
              {colors.map((c) => (
                <span
                  key={c}
                  style={{
                    backgroundColor: c,
                    border: color === c ? "2px solid black" : "none",
                  }}
                  onClick={() => {
                    setColor(c);
                    setIsColorPickerOpen(false);
                  }}
                  className="cm-color-option"
                />
              ))}
            </div>
          )}

          <input
            className="oi"
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="oi"
            type="text"
            placeholder="장소"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="oi"
            type="text"
            placeholder="장소 URL"
            value={locationUrl}
            onChange={(e) => setLocationUrl(e.target.value)}
          />
          <input
            className="oi"
            type="text"
            placeholder="그룹명 없음"
            value={groupName}
            // onChange={(e) => setGroupName(e.target.value)}
            readOnly
          />
          <div className="timeSetting">
            <div className="time-toggle">
              <label>
                <span
                  className="tstxt"
                  style={{
                    color: isAllDay ? "#a26af0" : "#ccc",
                  }}
                >
                  하루 종일
                </span>
                <input
                  type="checkbox"
                  checked={isAllDay}
                  onChange={(e) => setIsAllDay(e.target.checked)}
                />
              </label>
            </div>
            <div className="date-time-settings">
              <div className="inline-inputs">
                <input
                  className="sd"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  className="ed"
                  type="date"
                  value={endDate}
                  style={{
                    color: startDate === endDate ? "#ccc" : "black", // 조건부 스타일링
                  }}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="inline-inputs">
                {!isAllDay && (
                  <>
                    <input
                      className="st"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <input
                      className="et"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <textarea
            className="oii"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            cols="12"
          />

          <button className="cm-button" type="submit">
            {editEvent ? "수정" : "일정 추가"}
          </button>
          {editEvent && (
            <FaTrash
              className="ca-delete-button"
              title="Delete"
              onClick={handleDelete}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default CalendarAddModal;
