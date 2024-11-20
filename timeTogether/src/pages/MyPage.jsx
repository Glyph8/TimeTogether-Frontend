import React from "react";
import "./MyPage.css"; // 스타일 파일 import
import ProfileCard from "../components/ProfileCard";
import MyPageItem from "../components/MyPageItem";

function MyPage() {
  return (
    <div className="group-page">
      <ProfileCard name="최OO 님" />
      <MyPageItem title="내 모임 기록" onClick={() => {}} />
      <MyPageItem title="프로필 변경" onClick={() => {}} />
      <MyPageItem title="로그아웃" onClick={() => {}} />
    </div>
  );
}

export default MyPage;
