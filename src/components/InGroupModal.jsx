import React, { useState } from "react";
import "./InGroupModal.css";
import DeleteModal from "./DeleteModal"; // DeleteModal 가져오기

const InGroupModal = ({
  isOpen,
  onClose,
  groupImg,
  groupName,
  groupMembers,
  isMgr,
  groupId,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // DeleteModal 열림/닫힘 상태

  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음
  // 문자열을 배열로 변환
  const memberList =
    typeof groupMembers === "string" ? groupMembers.split(",") : groupMembers;

  const handleButtonClick = () => {
    if (isMgr) {
      // 그룹 해산 로직
      console.log("그룹 해산 처리");
    } else {
      // 그룹 나가기 로직
      console.log("그룹 나가기 처리");
    }
    onClose(); // 모달 닫기
  };

  return (
    <div className="ig-modal-overlay" onClick={onClose}>
      <div className="ig-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ig-modal-header">
          <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>그룹정보</h3>
          <img
            src={groupImg}
            alt={`${groupName} 그룹`}
            className="ig-group-image"
          />
          <h3 style={{ marginBottom: "30px" }}>{groupName} 팀</h3>
        </div>
        <hr
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            backgroundColor: "#e4e4e4",
            height: "1px",
            border: "none",
          }}
        ></hr>
        <div className="ig-modal-body">
          <h3>멤버</h3>
          <ul className="ig-member-list">
            {memberList.map((member, index) => (
              <li key={index} className="ig-member-item">
                <img
                  src="https://via.placeholder.com/40" // 멤버 이미지 (더미 이미지로 설정)
                  alt={`${member}`}
                  className="ig-member-image"
                />
                <span className="ig-member-name">{member}</span>
              </li>
            ))}
          </ul>
        </div>
        <hr
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            backgroundColor: "#e4e4e4",
            height: "1px",
            border: "none",
          }}
        ></hr>
        <div className="ig-modal-footer">
          {/* 조건부 버튼 렌더링 */}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="ig-close-button"
          >
            {isMgr ? "그룹 삭제" : "그룹 나가기"}
          </button>
          {/* <button onClick={onClose} className="close-button">
            닫기
          </button> */}
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={() => {
          setIsDeleteModalOpen(false); // DeleteModal 닫기
          onClose(); // InGroupModal도 닫기
        }}
        onCancel={() => setIsDeleteModalOpen(false)} // DeleteModal 닫기
        groupName={groupName}
        groupId={groupId}
        isManager={isMgr} // 관리자 여부 전달
      />
    </div>
  );
};

export default InGroupModal;
