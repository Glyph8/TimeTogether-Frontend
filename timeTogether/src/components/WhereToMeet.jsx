import React, { useState, useEffect } from "react";
import "./WhereToMeet.css";
import AddPlaceButton from "./AddPlaceButton";
import Header from "./Header";
import TabSelector from "./TabSelector";
import LocationItemList from "./LocationItemList";
import AddPlaceModal from "./AddPlaceModal";

function WhereToMeet() {
  const [activeTab, setActiveTab] = useState("어디서");
  const [locations, setLocations] = useState([]);
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const response = {
      code: 200,
      message: "요청에 성공하였습니다.",
      candidates: [
        {
          locationId: 101,
          locationName: "스타벅스 강남점",
          locationUrl: "https://naver.me/5xyzExample",
        },
        {
          locationId: 102,
          locationName: "투썸 강남점",
          locationUrl: "https://naver.me/7abcExample",
        },
        {
          locationId: 103,
          locationName: "커피빈 강남점",
          locationUrl: "https://naver.me/8defExample",
        },
      ],
    };
    setLocations(response.candidates); // 서버 응답 데이터를 상태로 설정
  }, []);

  const handleSelectLocation = (locationId) => {
    setSelectedLocationIds((prevSelected) => {
      if (prevSelected.includes(locationId)) {
        // 이미 선택된 장소면 선택 해제
        return prevSelected.filter((id) => id !== locationId);
      } else {
        // 선택되지 않은 장소면 선택 추가
        return [...prevSelected, locationId];
      }
    });
  };

  // 장소 삭제 함수
  const handleDeleteLocation = (locationId) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.locationId !== locationId)
    );
    setSelectedLocationIds((prevSelected) =>
      prevSelected.filter((id) => id !== locationId)
    );
  };

  // 모달 열기
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  // 장소 추가
  const handleAddPlace = ({ placeName, placeUrl }) => {
    const newPlace = {
      locationId: locations.length + 1 + 100,
      locationName: placeName,
      locationUrl: placeUrl,
    };
    setLocations((prevLocations) => [...prevLocations, newPlace]);
  };

  return (
    <div className="wheretomeet">
      <Header title="팀 1" />
      <TabSelector
        selectedOption={activeTab}
        onSelect={(option) => setActiveTab(option)}
      />
      <AddPlaceButton onAddPlace={openModal} />
      <LocationItemList
        locations={locations}
        selectedLocationIds={selectedLocationIds}
        onSelectLocation={handleSelectLocation}
        onDeleteLocation={handleDeleteLocation}
      />
      {isModalOpen && (
        <AddPlaceModal onClose={closeModal} onAddPlace={handleAddPlace} />
      )}
    </div>
  );
}

export default WhereToMeet;
