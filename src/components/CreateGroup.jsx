import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateGroup.css";
import back from "../img/mini-icon/back.png";
import axios from "axios";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [groupImg, setGroupImg] = useState("https://via.placeholder.com/100"); // 초기에는 기본 URL로 설정
  const [meetType, setMeetType] = useState("OFFLINE");
  const navigate = useNavigate();

  // 파일 선택 핸들러 - Data URL로 변환
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupImg(reader.result); // Data URL을 groupImg 상태로 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽음
    }
  };

  // 그룹 생성 요청 함수
  const handleCreateGroup = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(groupName);
    console.log(groupTitle);
    console.log(groupImg);
    console.log(meetType);
    console.log("백엔드 전송시작");

    try {
      const response = await axios.post(
        "http://192.168.233.218:8080/group/create",
        {
          groupName,
          groupTitle,
          groupImg, // Data URL로 전송
          meetType,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.httpStatus === "OK") {
        console.log("그룹 생성 성공:", response.data);
        navigate("/group");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("그룹 생성 실패:", error.response.data);
      } else {
        console.error("요청 중 오류 발생:", error);
      }
    }
  };

  return (
    <>
      <div className="create-group-container">
        <header className="create-group-header">
          <img
            onClick={() => navigate(-1)}
            className="cg-back-button"
            src={back}
            alt="back"
            width="28"
          />
          <h2>그룹 생성</h2>
        </header>

        <div className="create-group-content">
          <div className="profile-picture-placeholder">
            <label htmlFor="group-image-input">
              <img
                src={groupImg}
                alt="Group-image"
                className="profile-placeholder1"
                style={{ cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              id="group-image-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label>그룹명</label>
            <input
              type="text"
              placeholder="그룹명"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>어떤 그룹인가요?</label>
            <input
              type="text"
              placeholder="그룹에 대한 설명"
              value={groupTitle}
              onChange={(e) => setGroupTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>약속 유형</label>
            <select
              value={meetType}
              onChange={(e) => setMeetType(e.target.value)}
            >
              <option value="OFFLINE">오프라인</option>
              <option value="ONLINE">온라인</option>
              <option value="UNSPECIFIED">구분 안 함</option>
            </select>
          </div>

          <button className="create-group-button" onClick={handleCreateGroup}>
            그룹 생성하기
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
