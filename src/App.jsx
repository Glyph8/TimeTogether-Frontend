import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css"; // 기본 제공
import { Routes, Route, Link, useLocation } from "react-router-dom"; // Routes, Route, useLocation import
// 페이지 import
import LandingPage from "./pages/LandingPage"; // 랜딩 페이지
import Login from "./pages/Login"; // 로그인 페이지
import GroupPage from "./pages/GroupPage"; // 그룹 페이지
import CalendarPage from "./pages/CalendarPage"; // 캘린더 페이지
import SchedulePage from "./pages/SchedulePage"; // 회의일정 페이지
import MyPage from "./pages/MyPage"; // 마이페이지

import MeetingsPage from "./pages/MeetingsPage"; // 장소 페이지
// 컴포넌트 import
import CreateGroup from "./components/CreateGroup"; // 그룹생성 페이지
import NavigationBar from "./components/NavigationBar"; // 네비게이션 바
import AddPlaceModal from "./components/AddPlaceModal";

function App() {
  const location = useLocation(); // 현재 경로를 가져옵니다.

  // 특정 경로에 따라 NavigationBar를 숨깁니다.
  const hideNavigationPaths = ["/", "/login"]; // NavigationBar를 숨길 경로들
  const showNavigationBar = !hideNavigationPaths.includes(location.pathname);

  return (
    <>
      <div className="app-container">
        {/* 라우트 설정 */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/meetings/:id" element={<MeetingsPage />} />
          {/* <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} /> */}
        </Routes>
        {/* 조건부로 NavigationBar 렌더링 */}
        {showNavigationBar && <NavigationBar />}
      </div>
    </>
  );
}

export default App;
