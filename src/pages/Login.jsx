// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Login.css"; // css파일 import
// import logo from "../img/logo.png"; // 이미지 가져오기
// import logo2 from "../img/logo_purple.png";
// import kakao from "../img/kakao.png";
// import naver from "../img/naver.png";
// import google from "../img/google.png";

// function Login() {
//   return (
//     <div className="login-container">
//       {/* 로고 */}
//       <Link to="/group">
//         <img className="login-logo" src={logo} alt="로고"></img>
//       </Link>
//       {/* 앱 이름 */}
//       <h1 className="login-title">타임투게더</h1>

//       {/* 앱 설명 */}
//       <p className="login-description">쉽고 빠른 약속 생성 도우미</p>

//       {/* 소셜 로그인 */}
//       <div className="social-login-container">
//         <p className="social-login-title">소셜 로그인</p>
//         <a href="/oauth2/authorization/naver">
//           <img className="social-button" src={naver} alt="네이버로 시작"></img>
//         </a>
//         <a href="/oauth2/authorization/kakao">
//           <img className="social-button" src={kakao} alt="카카오로 시작"></img>
//         </a>
//         <a href="/oauth2/authorization/google">
//           <img className="social-button" src={google} alt="구글로 시작"></img>
//         </a>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../img/logo.png";
import kakao from "../img/kakao.png";
import naver from "../img/naver.png";
import google from "../img/google.png";

function Login() {
  const handleLogin = async (provider) => {
    try {
      const response = await fetch(
        `http://192.168.86.49:8080/oauth2/authorization/${provider}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        // 헤더에서 토큰 추출
        const token = response.headers.get("Authorization"); // 토큰을 담고 있는 헤더 키로 수정
        if (token) {
          localStorage.setItem("token", token); // 로컬 스토리지에 저장
          window.location.href = "/group"; // 로그인 성공 시 리다이렉트
        } else {
          console.error("토큰을 찾을 수 없습니다.");
        }
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="login-container">
      <Link to="/group">
        <img className="login-logo" src={logo} alt="로고" />
      </Link>
      <h1 className="login-title">Time Together</h1>
      <p className="login-description">쉽고 빠른 약속 생성 도우미</p>

      <div className="social-login-container">
        <p className="social-login-title">소셜 로그인</p>
        <button onClick={() => handleLogin("naver")}>
          <img className="social-button" src={naver} alt="네이버로 시작" />
        </button>
        <button onClick={() => handleLogin("kakao")}>
          <img className="social-button" src={kakao} alt="카카오로 시작" />
        </button>
        <button onClick={() => handleLogin("google")}>
          <img className="social-button" src={google} alt="구글로 시작" />
        </button>
      </div>
    </div>
  );
}

export default Login;
