// import React from "react";
// import "./SharePopover.css"; // 스타일 파일 import
// import { FaRegCopy } from "react-icons/fa";

// const SharePopover = ({ inviteCode, onClose }) => {
//   const handleCopy = () => {
//     navigator.clipboard.writeText(inviteCode);
//     alert("초대 코드가 복사되었습니다!");
//     onClose(); // 복사 후 Popover 닫기
//   };

//   return (
//     <div className="share-popover" onClick={(e) => e.stopPropagation()}>
//       <span className="invite-code-text">초대 코드: &nbsp;{inviteCode}</span>

//       <button className="copy-button" onClick={handleCopy}>
//         <FaRegCopy className="copy-icon" /> 코드 복사
//       </button>
//     </div>
//   );
// };

// export default SharePopover;

import React from "react";
import "./SharePopover.css"; // 스타일 파일 import
import { FaRegCopy } from "react-icons/fa";

const SharePopover = ({ inviteCode, onClose }) => {
  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(inviteCode)
        .then(() => {
          alert("초대 코드가 복사되었습니다!");
          onClose(); // 복사 후 Popover 닫기
        })
        .catch((err) => {
          console.error("복사 중 에러 발생:", err);
          alert("복사에 실패했습니다.");
        });
    } else {
      // Fallback 방식으로 복사
      try {
        const textarea = document.createElement("textarea");
        textarea.value = inviteCode;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("초대 코드가 복사되었습니다!");
        onClose();
      } catch (err) {
        console.error("복사 실패:", err);
        alert("복사에 실패했습니다.");
      }
    }
  };

  return (
    <div className="share-popover" onClick={(e) => e.stopPropagation()}>
      <span className="invite-code-text">초대 코드: </span>
      <span className="invite-code-text2">{inviteCode}</span>

      <button className="copy-button" onClick={handleCopy}>
        <FaRegCopy className="copy-icon" /> 코드 복사
      </button>
    </div>
  );
};

export default SharePopover;
