import React, { useState } from "react";
import "./DeleteModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const accessToken = localStorage.getItem("accessToken");
const DeleteModal = ({
  isOpen,
  onConfirm,
  onCancel,
  groupName,
  groupId,
  isManager,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null; // 모달이 열려 있지 않으면 렌더링하지 않음

  const handleDeleteOrLeave = async () => {
    try {
      const endpoint = isManager
        ? `/group/delete/${groupId}` // 관리자일 경우 그룹 삭제
        : `/group/${groupId}/leave`; // 일반 사용자일 경우 그룹 나가기
      console.log(endpoint);
      const response = await axios.delete(
        `http://192.168.233.218:8080${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.httpStatus === "OK") {
        alert(response.data.data || "요청이 성공적으로 처리되었습니다."); // 성공 메시지
        onConfirm(); // 모달 닫기 및 부모 컴포넌트 처리
        navigate("/group"); // 그룹 페이지로 이동
      } else {
        throw new Error(response.data.message || "요청 처리에 실패했습니다."); // 실패 시 에러 처리
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // 에러 메시지 표시
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다."); // 기타 오류 처리
      }
    }
  };

  return (
    <div className="delete-modal-overlay" onClick={onCancel}>
      <div
        className="delete-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{isManager ? "그룹 삭제" : "그룹 나가기"}</h3>
        {/* <p>{`'${groupName}' 그룹을 정말로 나가시겠습니까?`}</p> */}
        <p className="realDeleteContent">
          {isManager
            ? `'${groupName}' 그룹을 정말로 삭제하시겠습니까? 현재 인원들은 모두 해산됩니다.`
            : `'${groupName}' 그룹을 정말로 나가시겠습니까?`}
        </p>
        {errorMessage && <p className="d-error-message">{errorMessage}</p>}{" "}
        {/* 에러 메시지 */}
        <div className="delete-modal-buttons">
          {/* <button className="delete-confirm-button" onClick={onConfirm}>
            나가기
          </button> */}
          <button
            className="delete-confirm-button"
            onClick={handleDeleteOrLeave}
          >
            {isManager ? "삭제" : "나가기"}
          </button>
          <button className="delete-cancel-button" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
