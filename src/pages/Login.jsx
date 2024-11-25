import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../img/logo.png";
import kakao from "../img/kakao.png";
import naver from "../img/naver.png";
import google from "../img/google.png";

function Login() {
  const navigate = useNavigate();

  // 카카오 인가 요청 URL 생성 (redirect_uri 카카오developer에서 수정하기!!!!!)
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=f0cfd8fd7bb4da57b220043a25208ca7&redirect_uri=http://192.168.233.205:8080/login/oauth2/code/kakao&response_type=code`;

  return (
    <div className="login-container">
      <a href="/group">
        {/* 일단 로고 누르면 다음으로 넘어가게함 */}
        <img className="login-logo" src={logo} alt="로고" />
      </a>
      <h1 className="login-title">Time Together</h1>
      <p className="login-description">쉽고 빠른 약속 생성 도우미</p>

      <div className="social-login-container">
        <p className="social-login-title">소셜 로그인</p>

        {/* 카카오 로그인 버튼 */}
        {/* <a
          href="http://172.20.10.9:8080/oauth2/authorization/kakao"
          target="_self"
          rel="noopener noreferrer"
        >
          <img className="social-button" src={kakao} alt="카카오로 시작" />
        </a> */}
        <a
          href="http://172.20.10.4:8080/oauth2/authorization/kakao"
          target="_self"
          rel="noopener noreferrer"
        >
          <img className="social-button" src={kakao} alt="카카오로 시작" />
        </a>

        {/* 네이버 로그인 버튼 */}
        <a
          href="http://192.168.164.228:8080/oauth2/authorization/naver"
          target="_self"
          rel="noopener noreferrer"
        >
          <img className="social-button" src={naver} alt="네이버로 시작" />
        </a>

        {/* 구글 로그인 버튼 */}
        <a
          href="http://192.168.233.205:3000/oauth2/authorization/google"
          target="_self"
          rel="noopener noreferrer"
        >
          <img className="social-button" src={google} alt="구글로 시작" />
        </a>
      </div>
    </div>
  );
}

export default Login;

// useEffect(() => {
//   console.log("1111111");
//   // URL에서 code 파라미터 추출
//   const urlParams = new URLSearchParams(window.location.search);
//   const authCode = urlParams.get("code");

//   console.log("2222222");
//   if (authCode) {
//     console.log("333333");
//     // 인가 코드가 존재할 경우 alert로 출력
//     window.alert(`인가 코드 받음: ${authCode}`);
//     console.log("444444");
//     // 백엔드에 POST 요청으로 인가 코드 전달하여 토큰 받기
//     axios
//       .post("http://172.20.10.9:8080/oauth2/authorize/kakao", {
//         code: authCode,
//       })
//       .then((response) => {
//         const { token } = response.data;
//         localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
//         navigate("/group"); // 메인 페이지로 리디렉트
//       })
//       .catch((error) => {
//         console.error("로그인 실패:", error);
//       });
//   } else {
//     console.log("555555");
//     // 인가 코드가 없을 경우 alert로 "안 뜸" 출력
//     window.alert("인가 코드 없음");
//   }
//   console.log("666666");
// }, []);
