import React, { useState, useEffect, useRef } from "react";
import "./GroupCard.css";
import { FaTrash, FaShare } from "react-icons/fa";
import SharePopover from "./SharePopover";
import { useNavigate } from "react-router-dom";

const GroupCard = ({ group, onDelete }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null); // Popover와 공유 아이콘을 감지하기 위한 ref
  const navigate = useNavigate();

  const togglePopover = (e) => {
    e.stopPropagation(); // 이벤트 전파를 중단하여 카드의 onClick이 실행되지 않도록 함
    setIsPopoverOpen((prev) => !prev);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  // Popover 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closePopover();
      }
    };

    // 전역 클릭 이벤트 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="group-card"
      onClick={() => {
        navigate(`/meetings/${group.id}`);
      }}
    >
      <img src={group.image} alt="Group" className="group-image" />
      <div className="group-info">
        <h3>{group.name}</h3>
        <p className="group-description">{group.description}</p>
        <p className="group-members">{group.members.join(", ")}</p>
      </div>
      <div className="group-actions">
        {/* 삭제 아이콘 클릭 시 카드 이동 이벤트 방지 */}
        <FaTrash
          className="icon delete-icon"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 전파 중단
            onDelete();
          }}
        />

        {/* 공유 아이콘 클릭 시 Popover 표시 */}
        <div
          className="share-icon-wrapper"
          onClick={togglePopover}
          ref={popoverRef}
        >
          <FaShare className="icon share-icon" title="Share" />
          {isPopoverOpen && (
            <SharePopover inviteCode="1234-5678-ABCD" onClose={closePopover} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
