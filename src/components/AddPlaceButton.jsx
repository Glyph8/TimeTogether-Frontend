import React from "react";
import "./AddPlaceButton.css"; // 별도의 CSS 파일로 스타일을 가져옵니다.

const AddPlaceButton = ({ onAddPlace }) => {
  return (
    <div className="button-component" onClick={onAddPlace}>
      <div className="button-header">
        <span className="button-title">장소 게시판</span>
        <span className="button-icon">+</span>
      </div>
      <div className="button-subtitle">모임 가능한 장소를 선택해 주세요.</div>
    </div>
  );
};

export default AddPlaceButton;
