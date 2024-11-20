import React, { useState } from "react";
import "./AddPlaceModal.css";

const AddPlaceModal = ({ onClose, onAddPlace }) => {
  const [placeName, setPlaceName] = useState("");
  const [placeUrl, setPlaceUrl] = useState("");

  const handleAdd = () => {
    if (placeName) {
      onAddPlace({ placeName, placeUrl });
      setPlaceName("");
      setPlaceUrl("");
      onClose(); // 모달 닫기
    } else {
      alert("장소명을 입력해주세요.");
    }
  };

  return (
    <div className="place-modal-overlay">
      <div className="modal-content">
        <h2>장소 등록</h2>
        <input
          type="text"
          placeholder="장소명"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <textarea
          placeholder="장소 정보 URL"
          value={placeUrl}
          onChange={(e) => setPlaceUrl(e.target.value)}
          rows="2" // 기본 2줄로 설정
        />
        <button className="add-place-button" onClick={handleAdd}>
          장소 등록
        </button>
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default AddPlaceModal;
