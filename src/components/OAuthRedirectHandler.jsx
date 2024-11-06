// OAuthRedirectHandler.jsx
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// 로컬 스토리지에 저장하는 함수
function saveTokenToLocalStorage(accessToken, refreshToken) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

function OAuthRedirectHandler() {
  const history = useHistory();

  useEffect(() => {
    // URL 파라미터에서 토큰 추출
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // 로컬 스토리지에 토큰 저장
      saveTokenToLocalStorage(accessToken, refreshToken);

      // 메인 페이지로 리다이렉트
      history.push("/");
    } else {
      console.error("토큰이 없습니다.");
      history.push("/login"); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [history]);

  return <div>로그인 처리 중...</div>;
}

export default OAuthRedirectHandler;
