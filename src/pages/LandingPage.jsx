import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import logo from "../img/logo_trans2.png"; // 이미지 가져오기

function LandingPage() {
  const [isSwapped, setIsSwapped] = useState(false); // "Together"에서 "to gather"로 전환 여부
  const [isInitialFadeIn, setIsInitialFadeIn] = useState(false); // 초기 페이드 인 여부
  const navigate = useNavigate();

  useEffect(() => {
    // 초기 페이드 인 애니메이션 시작
    const initialFadeTimeout = setTimeout(() => {
      setIsInitialFadeIn(true); // "Time Together"를 페이드 인
    }, 500);

    // 1초 후 전환 애니메이션 시작
    const swapTimeout = setTimeout(() => {
      setIsSwapped(true); // "Together"에서 "to gather"로 전환
    }, 2000);

    const navigateTimeout = setTimeout(() => {
      navigate("/login");
    }, 3300); // 페이지 전환 시간

    return () => {
      clearTimeout(initialFadeTimeout);
      clearTimeout(swapTimeout);
      clearTimeout(navigateTimeout);
    };
  }, []);

  return (
    <div className="landing-container">
      <div className="lw">
        <p className={`main-text ${isInitialFadeIn ? "fade-in" : ""}`}>Time</p>
        <img
          className={`landing-logo ${isInitialFadeIn ? "fade-in" : ""}`}
          src={logo}
          alt="로고"
        ></img>
      </div>
      {/* "Together"는 초기 페이드 인 후 페이드 아웃되고, "to gather"는 간격을 두고 나타남 */}
      <p
        className={`animated-text ${
          isInitialFadeIn ? (isSwapped ? "fade-in-swap" : "fade-in") : ""
        } ${isSwapped ? "fade-out" : ""}`}
      >
        {isSwapped ? "to gather" : "Together"}
      </p>
    </div>
  );
}

export default LandingPage;
