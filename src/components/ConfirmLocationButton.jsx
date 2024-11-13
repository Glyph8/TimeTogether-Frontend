import React from "react";
import "./ConfirmLocationButton.css"; // 별도의 CSS 파일로 스타일을 가져옵니다.

const ConfirmLocationButton = ({ onConfrimPlace }) => {
  return (
    <div className="button-component" onClick={onConfrimPlace}>
      <div className="button-header">
        <span className="button-title">장소 확정</span>
      </div>
      <div className="button-subtitle">모임 장소를 선택해 주세요.</div>
    </div>
  );
};

export default ConfirmLocationButton;
