import React, { useState } from "react";
import "./InviteModal.css"; // 스타일 파일 import
import axios from "axios";
import { useNavigate } from "react-router-dom";
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const InviteModal = ({ isOpen, onClose }) => {
  const [inviteCode, setInviteCode] = useState(""); // 사용자 입력 값
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지
  const navigate = useNavigate(); // 페이지 이동용

  if (!isOpen) return null; // 모달이 열려있지 않으면 null 반환

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://192.168.233.218:8080/group/invited/${inviteCode}`,
        {}, // POST 요청 본문이 없을 경우 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      // 응답 처리
      if (response.data.httpStatus === "OK") {
        alert("그룹에 성공적으로 초대되었습니다!"); // 성공 메시지
        onClose(); // 모달 닫기
        navigate("/group"); // 그룹 페이지로 이동
      } else {
        throw new Error(response.data.message || "초대에 실패했습니다."); // 응답 상태가 성공이 아닌 경우 에러 처리
      }
    } catch (error) {
      // 에러 처리
      // if (error.response && error.response.data.message) {
      if (response.data.httpStatus === "ALREADY_REPORTED") {
        setErrorMessage(error.response.data.message); // 백엔드 에러 메시지 표시
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다."); // 기타 오류
      }
    }
  };

  return (
    <div className="invite-modal-overlay" onClick={onClose}>
      <div
        className="invite-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>초대코드 입력</h3>
        <input
          type="text"
          placeholder="초대 코드를 입력하세요"
          className="invite-input"
          value={inviteCode} // 입력값 바인딩
          onChange={(e) => setInviteCode(e.target.value)} // 입력값 업데이트
        />
        {errorMessage && <p className="i-error-message">{errorMessage}</p>}{" "}
        {/* 에러 메시지 표시 */}
        <div className="invite-modal-buttons">
          <button className="invite-confirm-button" onClick={handleSubmit}>
            확인
          </button>
          <button className="invite-cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
