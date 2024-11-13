import React, { useState, useEffect, useRef } from "react";
import "./GroupCard.css";
import { FaTrash, FaShare, FaUserPlus } from "react-icons/fa";
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

  const totalNumber = group.groupMembers
    ? group.groupMembers.split(",").length + 1
    : 1;

  return (
    <div
      className="group-card"
      onClick={() => {
        navigate(`/meetings/${group.groupId}?totalNumber=${totalNumber}`);
      }}
    >
      <img src={group.groupImg} alt="Group" className="group-image" />
      <div className="group-info">
        <h3>{group.groupName}</h3>
        <p className="group-description">{group.groupTitle}</p>
        <p className="group-members">{group.groupMembers}</p>
      </div>
      <div className="group-actions">
        {/* 공유 아이콘 클릭 시 Popover 표시 */}
        <div
          className="share-icon-wrapper"
          onClick={togglePopover}
          ref={popoverRef}
        >
          <FaUserPlus className="icon share-icon" title="Share" />
          {/* <FaShare className="icon share-icon" title="Share" /> */}
          {isPopoverOpen && (
            <SharePopover inviteCode="1234-5678-ABCD" onClose={closePopover} />
          )}
        </div>

        {/* 삭제 아이콘 클릭 시 카드 이동 이벤트 방지 */}
        <FaTrash
          className="icon delete-icon"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 전파 중단
            onDelete();
          }}
        />
      </div>
    </div>
  );
};

export default GroupCard;
