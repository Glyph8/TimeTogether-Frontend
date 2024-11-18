import React from "react";
import "./SharePopover.css"; // 스타일 파일 import
import { FaRegCopy } from "react-icons/fa";

const SharePopover = ({ inviteCode, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    alert("초대 코드가 복사되었습니다!");
    onClose(); // 복사 후 Popover 닫기
  };

  return (
    <div className="share-popover" onClick={(e) => e.stopPropagation()}>
      <span className="invite-code-text">초대 코드: &nbsp;{inviteCode}</span>

      <button className="copy-button" onClick={handleCopy}>
        <FaRegCopy className="copy-icon" /> 코드 복사
      </button>
    </div>
  );
};

export default SharePopover;
