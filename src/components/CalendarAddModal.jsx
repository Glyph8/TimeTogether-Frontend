import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./CalendarAddModal.css";

function CalendarAddModal({
  date,
  addEvent,
  updateEvent,
  closeModal,
  editEvent,
}) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#f5a623");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  // editEvent가 있을 때 초기값을 설정
  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setLocation(editEvent.location);
      setColor(editEvent.color);
    } else {
      // editEvent가 없을 때는 빈 값으로 초기화
      setTitle("");
      setLocation("");
      setColor("#FFC553");
    }
  }, [editEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제목과 장소가 비어있을 경우 기본값을 설정
    const eventTitle = title.trim() === "" ? "새로운 일정" : title;
    const eventLocation = location.trim() === "" ? "장소없음" : location;
    const event = { title: eventTitle, location: eventLocation, color };
    if (editEvent) {
      updateEvent(format(date, "yyyy-MM-dd"), event);
    } else {
      addEvent(format(date, "yyyy-MM-dd"), event);
    }
    closeModal();
  };

  const colors = [
    "#FDBAAB",
    "#FEA666",
    "#FFC553",
    // "#A26AF0",
    "#b790eb",
    "#9747FF",
    "#3B4FFF",
  ];

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
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="장소"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div>하루종일, 시간관련</div>
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4" // 세로 크기 (행 수)
            cols="12" // 가로 크기 (열 수)
          />
          {/* <input
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          /> */}
          <button type="submit">{editEvent ? "일정 수정" : "일정 등록"}</button>
        </form>
      </div>
    </div>
  );
}

export default CalendarAddModal;
