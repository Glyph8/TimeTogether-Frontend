import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // css파일 import
import logo from "../img/logo.png"; // 이미지 가져오기
import logo2 from "../img/logo_purple.png";
import kakao from "../img/kakao.png";
import naver from "../img/naver.png";
import google from "../img/google.png";

function Login() {
  return (
    <div className="login-container">
      {/* 로고 */}
      <Link to="/group">
        <img className="login-logo" src={logo} alt="로고"></img>
      </Link>
      {/* 앱 이름 */}
      <h1 className="login-title">타임투게더</h1>

      {/* 앱 설명 */}
      <p className="login-description">쉽고 빠른 약속 생성 도우미</p>

      {/* 소셜 로그인 */}
      <div className="social-login-container">
        <p className="social-login-title">소셜 로그인</p>
        <a href="/oauth2/authorization/naver">
          <img className="social-button" src={naver} alt="네이버로 시작"></img>
        </a>
        <a href="/oauth2/authorization/kakao">
          <img className="social-button" src={kakao} alt="카카오로 시작"></img>
        </a>
        <a href="/oauth2/authorization/google">
          <img className="social-button" src={google} alt="구글로 시작"></img>
        </a>
      </div>
    </div>
  );
}

export default Login;
