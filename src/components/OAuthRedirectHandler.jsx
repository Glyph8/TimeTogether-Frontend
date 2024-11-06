// OAuthRedirectHandler.jsx
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// 로컬 스토리지에 저장하는 예시
function saveTokenToLocalStorage(accessToken, refreshToken) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

// 쿠키에 저장하는 예시
function saveTokenToCookie(accessToken, refreshToken) {
  document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; Secure; SameSite=Strict`;
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=86400; Secure; SameSite=Strict`;
}

function OAuthRedirectHandler() {
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // 로컬 스토리지에 저장할 경우
      saveTokenToLocalStorage(accessToken, refreshToken);

      // 쿠키에 저장할 경우
      // saveTokenToCookie(accessToken, refreshToken);

      // 로그인 후 메인 페이지로 이동
      history.push("/");
    } else {
      console.error("토큰이 없습니다.");
      history.push("/login"); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [history]);

  return <div>로그인 처리 중...</div>;
}

export default OAuthRedirectHandler;
