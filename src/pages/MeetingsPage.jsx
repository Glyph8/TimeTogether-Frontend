// MeetingsPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import WhereToMeet from "../components/WhereToMeet";
import "./MeetingsPage.css";
import Header from "../components/Header";
import TabSelector from "../components/TabSelector";
import LocationItemList from "../components/LocationItemList";
import AddPlaceButton from "../components/AddPlaceButton";
import AddPlaceModal from "../components/AddPlaceModal";
import SelectPlaceButton from "../components/SelectPlaceButton";
import TimetableContent from "../components/TimetableContent.jsx";
import ConfirmLocationButton from "../components/ConfirmLocationButton.jsx";
import LocationSimpleItemList from "../components/LocationSimpleItemList.jsx";
import axios from "axios";
import MeetingListPage from "./MeetingListPage.jsx";
import { useLocation } from "react-router-dom";

function MeetingsPage() {
  const { groupId, meetingId } = useParams(); //groupid
  const [activeTab, setActiveTab] = useState("언제");
  const [locations, setLocations] = useState([]);
  const [confirmLocationId, setConfirmLocationId] = useState(null);
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHost, setIsHost] = useState(false); // 방장 여부 상태 추가
  const [isPlaceConfirmed, setIsPlaceConfirmed] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const totalNumber = searchParams.get("totalNumber") || 1;
  const meetingTitle = searchParams.get("meetTitle") || "";
  const isMgr = searchParams.get("isMgr") || false;

  useEffect(() => {
    setIsHost(isMgr);
  }, [isMgr]);

  useEffect(() => {
    console.log(totalNumber);
    const response = {
      code: 200,
      message: "요청에 성공하였습니다.",
      candidates: [
        {
          locationId: 101,
          locationName: "스타벅스 강남점",
          locationUrl: "https://naver.me/5xyzExample",
          count: 4,
        },
        {
          locationId: 102,
          locationName: "투썸 강남점",
          locationUrl: "https://naver.me/7abcExample",
          count: 3,
        },
        {
          locationId: 103,
          locationName: "커피빈 강남점",
          locationUrl: "https://naver.me/8defExample",
          count: 2,
        },
      ],
    };
    setLocations(response.candidates); // 서버 응답 데이터를 상태로 설정
  }, [totalNumber]);

  useEffect(() => {
    let intervalId;
    const fetchMeetingLocations = async () => {
      try {
        const response = await axios.get(
          `http://192.168.233.218:8080/group/${groupId}/${meetingId}/where/view`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 토큰 헤더 추가
            },
          }
        );

        // 응답 데이터 처리
        const data = response.data;
        if (data.httpStatus === "OK") {
          setLocations(data); // 상태 업데이트
        } else {
          throw new Error(data.message || "데이터 로드에 실패했습니다.");
        }
      } catch (error) {
        // 에러 처리
        if (error.response && error.response.data) {
          console.error(
            error.response.data.message || "API 오류가 발생했습니다."
          );
        } else {
          console.error("알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    // 주기적으로 fetchMeetingLocations 실행
    intervalId = setInterval(fetchMeetingLocations, 1000); // 1초마다 호출

    // 클린업 함수
    return () => clearInterval(intervalId); // 언마운트 시 Interval 해제
  }, [groupId, meetingId, accessToken]);

  const handleSelectLocation = async (locationId) => {
    const isSelected = selectedLocationIds.includes(locationId);

    // 낙관적 업데이트: 로컬 상태 즉시 업데이트
    setSelectedLocationIds(
      (prevSelected) =>
        isSelected
          ? prevSelected.filter((id) => id !== locationId) // 선택 해제
          : [...prevSelected, locationId] // 선택 추가
    );

    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.groupWhereId === locationId
          ? {
              ...location,
              count: isSelected ? location.count - 1 : location.count + 1, // 선택 여부에 따라 count 변경
            }
          : location
      )
    );

    try {
      // 서버와 동기화
      await syncVoteWithServer(locationId, isSelected ? 0 : 1);
    } catch (error) {
      console.error("투표 요청 실패:", error.message);

      // 서버 요청 실패 시 로컬 상태 복구
      setSelectedLocationIds(
        (prevSelected) =>
          isSelected
            ? [...prevSelected, locationId] // 복구: 선택 복원
            : prevSelected.filter((id) => id !== locationId) // 복구: 선택 해제
      );

      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.groupWhereId === locationId
            ? {
                ...location,
                count: isSelected ? location.count + 1 : location.count - 1, // 복구: count 원래대로
              }
            : location
        )
      );
    }
  };

  const syncVoteWithServer = async (locationId, UpAndDown) => {
    try {
      const response = await axios.post(
        `http://192.168.233.218:8080/group/${groupId}/${meetingId}/where/vote/${locationId}/${UpAndDown}`,
        {}, // POST 요청 본문이 없으면 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 인증 토큰 추가
          },
        }
      );

      const data = response.data;

      if (data.httpStatus === "OK") {
        console.log(`장소 ${locationId} 투표 성공! UpAndDown: ${UpAndDown}`);
      } else {
        throw new Error(data.message || "투표 요청에 실패했습니다.");
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "API 요청 중 오류가 발생했습니다."
      );
    }
  };

  const handleConfirmLocationId = (groupWhereId) => {
    setConfirmLocationId(groupWhereId); // Confirm ID 설정
  };

  const handleFinalConfirmLocation = async () => {
    try {
      if (!confirmLocationId) {
        alert("확정할 장소가 선택되지 않았습니다.");
        return;
      }

      // API 요청
      const response = await axios.post(
        `http://192.168.233.218:8080/group/${groupId}/${meetingId}/where/done/${confirmLocationId}`,
        {}, // POST 요청 본문이 없으면 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
          },
        }
      );

      const data = response.data;

      if (data.httpStatus === "OK") {
        alert("장소가 확정되었습니다!");
        setConfirmLocationId(confirmLocationId); // 성공한 whereId 저장
        setIsPlaceConfirmed(false);
      } else {
        throw new Error(data.message || "장소 확정에 실패했습니다.");
      }
    } catch (error) {
      // 에러 처리
      if (error.response && error.response.data) {
        alert(
          error.response.data.message || "API 요청 중 오류가 발생했습니다."
        );
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 모달 열기
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  //장소 삭제
  const handleDeleteLocation = async (groupWhereId) => {
    try {
      // 서버에 삭제 요청
      const response = await axios.delete(
        `http://192.168.233.218:8080/group/${groupId}/${meetingId}/where/delete/${groupWhereId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 필요하면 인증 토큰 추가
          },
        }
      );

      const data = response.data;

      if (data.httpStatus === "OK") {
        alert(data.data); // "삭제가 완료되었습니다." 메시지 표시

        // 로컬 상태 업데이트
        setLocations((prevLocations) =>
          prevLocations.filter(
            (location) => location.groupWhereId !== groupWhereId
          )
        );
        setSelectedLocationIds((prevSelected) =>
          prevSelected.filter((id) => id !== groupWhereId)
        );
      } else {
        throw new Error(data.message || "삭제 요청에 실패했습니다.");
      }
    } catch (error) {
      // 에러 처리
      if (error.response && error.response.data) {
        alert(
          error.response.data.message || "API 요청 중 오류가 발생했습니다."
        );
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 장소 추가
  const handleAddPlace = async ({ placeName, placeUrl }) => {
    try {
      // 요청 데이터 준비
      const requestData = {
        groupWhereName: placeName,
        groupWhereUrl: placeUrl,
      };

      // API 호출
      const response = await axios.post(
        `http://192.168.233.218:8080/group/${groupId}/${meetingId}/where/create`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 필요하면 인증 토큰 추가
          },
        }
      );

      // 응답 데이터 처리
      const data = response.data;
      if (data.httpStatus === "OK") {
        const newPlace = {
          groupWhereId: data.groupWhereId,
          groupId: data.groupId,
          groupLocationName: data.groupLocationName,
          groupWhereUrl: data.groupWhereUrl,
          count: data.count,
          groupMeetingId: data.groupMeetingId,
        };
        setLocations((prevLocations) => [...prevLocations, newPlace]); // 상태 업데이트
      } else {
        throw new Error(data.message || "장소 추가에 실패했습니다.");
      }
    } catch (error) {
      // 에러 처리
      if (error.response && error.response.data) {
        alert(
          error.response.data.message || "API 요청 중 오류가 발생했습니다."
        );
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleConfirmPlacePage = () => {
    setIsPlaceConfirmed(true); // 장소 확정 상태를 true로 변경
  };

  return (
    <div className="meetings-page">
      {isModalOpen && (
        <AddPlaceModal onClose={closeModal} onAddPlace={handleAddPlace} />
      )}
      <Header
        title={meetingTitle}
        onBackClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/group"); // 기본 경로 설정
          }
        }}
        onMenuClick={() => {}}
      />
      <TabSelector
        selectedOption={activeTab}
        onSelect={(option) => setActiveTab(option)}
      />
      <div className="tab-content">
        {activeTab === "언제" && ( //해당 그룹의 모임 리스트 출력
          <>
            <TimetableContent></TimetableContent>
          </>
        )}
        {activeTab === "어디서" && (
          <>
            {!isPlaceConfirmed ? (
              <>
                <AddPlaceButton onAddPlace={openModal} />
                <LocationItemList
                  totalMembers={totalNumber}
                  locations={locations}
                  selectedLocationIds={selectedLocationIds}
                  onSelectLocation={handleSelectLocation}
                  onDeleteLocation={handleDeleteLocation}
                />
                {isHost && (
                  <SelectPlaceButton onClick={handleConfirmPlacePage} />
                )}
              </>
            ) : (
              <>
                <ConfirmLocationButton
                  onConfrimPlace={handleFinalConfirmLocation}
                />
                <LocationSimpleItemList
                  locations={locations}
                  selectedLocationIds={confirmLocationId}
                  onSelectLocation={handleConfirmLocationId}
                  totalNumber={totalNumber}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MeetingsPage;
