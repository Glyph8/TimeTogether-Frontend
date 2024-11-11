import React, { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 로컬 스토리지에 토큰 저장
function saveTokenToLocalStorage(accessToken, refreshToken) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

function OAuthRedirectHandler() {
  // const history = useHistory();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("리다이렉트 ok");
    // URL에서 code 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    console.log("인가코드 추출 시작");
    if (authCode) {
      console.log("인가코드 존재");
      // 인가 코드를 alert로 출력
      window.alert(`인가 코드 받음: ${authCode}`);

      // 백엔드에 POST 요청으로 인가 코드 전달하여 토큰 받기
      axios
        // .get(`http://172.20.10.9:8080/oauth2/authorize/kakao?code=${authCode}`)
        .post("http://172.20.10.9:8080/oauth2/authorize/kakao", {
          code: authCode,
        })
        .then((response) => {
          console.log("토큰 받음");
          console.log(response.data);
          const { token } = response.data;

          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem("token", token);

          // 메인 페이지로 리디렉트
          navigate("/group");
        })
        .catch((error) => {
          console.error("로그인 실패:", error);
        });
    } else {
      console.log("33333333");
      window.alert("인가 코드가 없습니다.");
    }
    console.log("44444444");
  }, []);

  return <div>로그인 처리 중...</div>;
}

export default OAuthRedirectHandler;

// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // 로컬 스토리지에 토큰 저장
// function saveTokenToLocalStorage(accessToken) {
//   localStorage.setItem("accessToken", accessToken);
// }

// function OAuthRedirectHandler() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("OAuthRedirectHandler 시작");

//     // 백엔드로 인가코드를 보내면 백엔드에서 헤더에 토큰을 설정해 반환
//     axios
//       // .get("http://172.20.10.9:8080/oauth2/authorize/kakao", {
//       //   withCredentials: true,
//       // })
//       // .get(`http://172.20.10.9:8080/oauth2/authorize/kakao?code=${authCode}`)
//       .post("http://172.20.10.9:8080/oauth2/authorize/kakao", {
//         code: authCode,
//       })
//       .then((response) => {
//         // response가 null인지 확인
//         if (!response) {
//           console.error("응답이 없습니다. response가 null입니다.");
//           window.alert("응답을 받지 못했습니다.");
//           return;
//         }

//         // 응답 헤더에서 액세스 토큰을 가져옴
//         console.log(response.body);
//         const accessToken = response.headers["Authorization"];

//         if (accessToken) {
//           // 액세스 토큰을 로컬 스토리지에 저장
//           saveTokenToLocalStorage(accessToken);
//           console.log("액세스 토큰 저장 완료:", accessToken);

//           // 메인 페이지로 리디렉트
//           navigate("/group");
//         } else {
//           console.error("액세스 토큰을 받지 못했습니다.");
//           window.alert("액세스 토큰을 받지 못했습니다.");
//         }
//       })
//       .catch((error) => {
//         console.error("로그인 실패:", error);
//       });
//   }, [navigate]);

//   return <div>로그인 처리 중...</div>;
// }

// export default OAuthRedirectHandler;
//----------------------------------------------------------------------------------------
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // 로컬 스토리지에 토큰 저장
// function saveTokensToLocalStorage(accessToken, refreshToken) {
//   localStorage.setItem("accessToken", accessToken);
//   localStorage.setItem("refreshToken", refreshToken);
// }
// // JWT의 만료 시간 확인 함수
// function isTokenExpired(token) {
//   const tokenParts = token.split(".");
//   if (tokenParts.length !== 3) return true; // 토큰이 올바르지 않으면 만료로 간주

//   const payload = JSON.parse(atob(tokenParts[1])); // base64 디코딩
//   const exp = payload.exp * 1000; // 만료 시간 (밀리초)
//   const currentTime = Date.now(); // 현재 시간 (밀리초)

//   return currentTime > exp; // 현재 시간이 만료 시간보다 크면 true (만료됨)
// }
// function sendTokenToBackend(token, isAccessToken = true) {
//   const tokenType = isAccessToken ? "액세스" : "리프레시";
//   console.log(`${tokenType} 토큰을 백엔드에 전송합니다.`);

//   axios
//     .get("http://172.20.10.9:8080/header", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       console.log("백엔드 응답:", response.data);
//     })
//     .catch((error) => {
//       console.error("백엔드로 토큰 전송 실패:", error);
//     });
// }
// function checkAndSendToken() {
//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");

//   if (!accessToken || !refreshToken) {
//     console.error("저장된 토큰이 없습니다.");
//     return;
//   }

//   if (isTokenExpired(accessToken)) {
//     // 액세스 토큰이 만료된 경우 리프레시 토큰을 사용하여 요청
//     console.log("액세스 토큰이 만료되었습니다. 리프레시 토큰을 사용합니다.");
//     sendTokenToBackend(refreshToken, false);
//   } else {
//     // 액세스 토큰이 유효한 경우 액세스 토큰을 사용하여 요청
//     console.log("액세스 토큰이 유효합니다.");
//     sendTokenToBackend(accessToken, true);
//   }
// }

// function OAuthRedirectHandler() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("OAuthRedirectHandler 시작");

//     // 현재 URL에서 쿼리 파라미터로 access_token과 refresh_token을 추출
//     const urlParams = new URLSearchParams(window.location.search);
//     const accessToken = urlParams.get("access_token");
//     const refreshToken = urlParams.get("refresh_token");

//     // access_token과 refresh_token이 모두 있는지 확인
//     if (accessToken && refreshToken) {
//       console.log("액세스 토큰 받음:", accessToken);
//       console.log("리프레시 토큰 받음:", refreshToken);

//       // 토큰을 로컬 스토리지에 저장
//       saveTokensToLocalStorage(accessToken, refreshToken);
//       console.log("토큰 저장 완료");
//       // 토큰을 체크하고 백엔드에 전송
//       checkAndSendToken();

//       // 메인 페이지로 리디렉트
//       navigate("/group");
//     } else {
//       console.error("액세스 토큰 또는 리프레시 토큰을 받지 못했습니다.");
//       window.alert("토큰을 받지 못했습니다.");
//     }
//   }, [navigate]);

//   return <div>로그인 처리 중...</div>;
// }

// export default OAuthRedirectHandler;

//-----------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // 로컬 스토리지에 토큰 저장
// function saveTokensToLocalStorage(accessToken, refreshToken) {
//   localStorage.setItem("accessToken", accessToken);
//   localStorage.setItem("refreshToken", refreshToken);
// }

// // JWT의 만료 시간 확인 함수
// function isTokenExpired(token) {
//   const tokenParts = token.split(".");
//   if (tokenParts.length !== 3) return true; // 토큰이 올바르지 않으면 만료로 간주

//   const payload = JSON.parse(atob(tokenParts[1])); // base64 디코딩
//   const exp = payload.exp * 1000; // 만료 시간 (밀리초)
//   const currentTime = Date.now(); // 현재 시간 (밀리초)

//   return currentTime > exp; // 현재 시간이 만료 시간보다 크면 true (만료됨)
// }

// function sendTokenToBackend(token, isAccessToken = true) {
//   const tokenType = isAccessToken ? "액세스" : "리프레시";
//   console.log(`${tokenType} 토큰을 백엔드에 전송합니다.`);

//   axios
//     .get("http://172.20.10.9:8080/header", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       console.log("백엔드 응답:", response.data);
//     })
//     .catch((error) => {
//       console.error("백엔드로 토큰 전송 실패:", error);
//     });
// }

// function checkAndSendToken() {
//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");

//   if (!accessToken || !refreshToken) {
//     console.error("저장된 토큰이 없습니다.");
//     return;
//   }

//   if (isTokenExpired(accessToken)) {
//     // 액세스 토큰이 만료된 경우 리프레시 토큰을 사용하여 요청
//     console.log("액세스 토큰이 만료되었습니다. 리프레시 토큰을 사용합니다.");
//     sendTokenToBackend(refreshToken, false);
//   } else {
//     // 액세스 토큰이 유효한 경우 액세스 토큰을 사용하여 요청
//     console.log("액세스 토큰이 유효합니다.");
//     sendTokenToBackend(accessToken, true);
//   }
// }

// function OAuthRedirectHandler() {
//   const navigate = useNavigate();
//   const [isTokenProcessed, setIsTokenProcessed] = useState(false); // 토큰이 처리되었는지 확인

//   useEffect(() => {
//     console.log("OAuthRedirectHandler 시작");

//     // URL에서 쿼리 파라미터로 access_token과 refresh_token을 추출
//     const urlParams = new URLSearchParams(window.location.search);
//     const accessToken = urlParams.get("access_token");
//     const refreshToken = urlParams.get("refresh_token");

//     // access_token과 refresh_token이 모두 있는지 확인
//     if (accessToken && refreshToken && !isTokenProcessed) {
//       console.log("액세스 토큰 받음:", accessToken);
//       console.log("리프레시 토큰 받음:", refreshToken);

//       // 토큰을 로컬 스토리지에 저장
//       saveTokensToLocalStorage(accessToken, refreshToken);
//       console.log("토큰 저장 완료");

//       // 토큰을 체크하고 백엔드에 전송
//       checkAndSendToken();

//       // 토큰이 처리된 상태로 변경하여 navigate가 다시 호출되지 않도록 함
//       setIsTokenProcessed(true);

//       // 메인 페이지로 리디렉트
//       navigate("/group");
//     } else if (!accessToken || !refreshToken) {
//       console.error("액세스 토큰 또는 리프레시 토큰을 받지 못했습니다.");
//       window.alert("토큰을 받지 못했습니다.");
//     }
//   }, [navigate, isTokenProcessed]);

//   return <div>로그인 처리 중...</div>;
// }

// export default OAuthRedirectHandler;
