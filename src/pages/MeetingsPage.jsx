// MeetingsPage.js
import React, {useState, useEffect} from "react";
import {useParams, useNavigate, Routes, Route} from "react-router-dom";
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

function MeetingsPage() {

    const {id: groupId} = useParams(); //groupid
    const [activeTab, setActiveTab] = useState("언제");
    const [locations, setLocations] = useState([]);
    const [confirmLocationId, setConfirmLocationId] = useState(null);
    const [selectedLocationIds, setSelectedLocationIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHost, setIsHost] = useState(true); // 방장 여부 상태 추가
    const [isPlaceConfirmed, setIsPlaceConfirmed] = useState(false);
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const totalNumber = searchParams.get("totalNumber") || 1;


    const [whenData, setWhenData] = useState({});
    useEffect(() => {

        const whenDataResponse = {
            code: 200,
            message: "요청에 성공하였습니다.",
            requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            result: {
                meetId: 10,
                meetDTstart: "2024-10-09 14:30:00",
                meetDTend: "2024-10-09 16:30:00",
                meetType: "오프라인",
                meetTitle: "산협프2 아이디어 회의",
                meetContent: null,
                groupName: "와쿠와쿠",
                locationName: "투썸",
                locationUrl: "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B1%B4%EB%8C%80+%ED%88%AC%EC%8D%B8+url"
            }
        }
        setWhenData(whenDataResponse.result);
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

    //   useEffect(() => {
    //     const fetchLocations = async () => {
    //         try {
    //             const response = await fetch(`/group/${groupId}/where/view`);
    //             const data = await response.json();
    //             setLocations(data.candidates);
    //         } catch (error) {
    //             console.error("API 요청 에러:", error);
    //         }
    //     };

    //     // 초기 데이터 가져오기
    //     fetchLocations();

    //     // 5초마다 데이터 요청을 보냄
    //     const intervalId = setInterval(fetchLocations, 5000);

    //     // 컴포넌트 언마운트 시 인터벌 클리어
    //     return () => clearInterval(intervalId);
    // }, [groupId]);

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


    const handleConfirmLocation = (locationId) => {
        setConfirmLocationId(locationId); // Confirm ID 설정
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
    const handleAddPlace = ({placeName, placeUrl}) => {
        const newPlace = {
            locationId: locations.length + 1 + 100,
            locationName: placeName,
            locationUrl: placeUrl,
        };
        setLocations((prevLocations) => [...prevLocations, newPlace]);
    };

    const handleConfirmPlace = () => {
        setIsPlaceConfirmed(true); // 장소 확정 상태를 true로 변경
    };

    return (
        <div className="meetings-page">
            {isModalOpen && (
                <AddPlaceModal onClose={closeModal} onAddPlace={handleAddPlace}/>
            )}
            <Header
                title={"ExampleTeam"}
                onBackClick={() => {
                    if (window.history.length > 1) {
                        navigate(-1);
                    } else {
                        navigate("/group"); // 기본 경로 설정
                    }
                }}
                onMenuClick={() => {
                }}
            />
            <TabSelector
                selectedOption={activeTab}
                onSelect={(option) => setActiveTab(option)}
            />
            <div className="tab-content">
                {activeTab === "언제" && (//해당 그룹의 모임 리스트 출력
                    //group/{groupID}/when
                    <>
                        <Routes>
                            <Route path="/" element={
                                // <MeetingListPage whenData={whenData}/>
                                <MeetingListPage whenData={whenData}/>
                            }/>
                            <Route path="/when/type" element={
                                <TimetableContent
                                    groupId={groupId}
                                    // whenData={whenData}
                                />}/>
                        </Routes>

                        {/*<TimetableContent*/}
                        {/*    groupId={groupId}*/}
                        {/*    meetType={whenData.meetType}*/}
                        {/*    meetDTstart={whenData.meetDTstart}*/}
                        {/*    meetDTend={whenData.meetDTend}*/}
                        {/*/>*/}
                    </>
                )}
                {activeTab === "어디서" && (
                    <>
                        {!isPlaceConfirmed ? (
                            <>
                                <AddPlaceButton onAddPlace={openModal}/>
                                <LocationItemList
                                    totalMembers={totalNumber}
                                    locations={locations}
                                    selectedLocationIds={selectedLocationIds}
                                    onSelectLocation={handleSelectLocation}
                                    onDeleteLocation={handleDeleteLocation}
                                />
                                {isHost && <SelectPlaceButton onClick={handleConfirmPlace}/>}
                            </>
                        ) : (
                            <>
                                <ConfirmLocationButton onConfrimPlace={() => {
                                }}/>
                                <LocationSimpleItemList
                                    locations={locations}
                                    selectedLocationIds={confirmLocationId}
                                    onSelectLocation={handleConfirmLocation}
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
