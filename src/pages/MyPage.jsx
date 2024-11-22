import React, { useState } from "react";
import "./MyPage.css"; // 스타일 파일 import
import ProfileCard from "../components/ProfileCard";
import MyPageItem from "../components/MyPageItem";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate import

function MyPage() {
  const [isLoggedOut, setIsLoggedOut] = useState(false); // 로그아웃 상태 관리
  const accessToken = localStorage.getItem("accessToken"); // 토큰 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://192.168.186.162:8080/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data && response.data.httpStatus === "OK") {
        // 성공적으로 로그아웃
        console.log("Logout successful:", response.data);
        // localStorage.removeItem("accessToken"); // 토큰 제거
        setIsLoggedOut(true); // 로그아웃 상태로 변경
      }
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // /login 페이지로 이동
  };

  return (
    <div className="group-page">
      {/* <ProfileCard name="최OO 님" />
      <MyPageItem title="내 모임 기록" onClick={() => {}} />
      <MyPageItem title="프로필 변경" onClick={() => {}} />
      <MyPageItem title="로그아웃" onClick={() => {}} /> */}

      {isLoggedOut ? (
        <>
          <ProfileCard name=" -  &nbsp;님" />
          <MyPageItem title="로그인" onClick={handleLoginClick} />
        </>
      ) : (
        <>
          <ProfileCard name="최OO 님" />
          <MyPageItem title="내 모임 기록" onClick={() => {}} />
          <MyPageItem title="프로필 변경" onClick={() => {}} />
          <MyPageItem title="로그아웃" onClick={handleLogout} />
        </>
      )}
    </div>
  );
}

export default MyPage;
