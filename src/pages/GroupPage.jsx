import React, { useEffect, useState } from "react";
import "./GroupPage.css";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CreateGroup from "../components/CreateGroup";
import GroupCard from "../components/GroupCard";
import InviteModal from "../components/InviteModal";
import DeleteModal from "../components/DeleteModal"; // DeleteModal import

function GroupPage() {
  const [groups, setGroups] = useState([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false); // 초대 모달 열림 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달 열림 상태
  const [selectedGroup, setSelectedGroup] = useState(null); // 삭제할 그룹 정보

  // 백엔드에서 그룹 데이터를 가져오는 함수 (예시)
  // useEffect(() => {
  //   // 여기에 실제 API 호출 코드 작성
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await fetch("YOUR_API_ENDPOINT");
  //       const data = await response.json();
  //       setGroups(data); // 받아온 데이터를 상태에 저장
  //     } catch (error) {
  //       console.error("그룹 데이터를 가져오는 중 오류 발생:", error);
  //     }
  //   };

  //   fetchGroups();
  // }, []);
  // 예시 데이터를 설정

  useEffect(() => {
    // 예시 데이터
    const exampleGroups = [
      {
        id: 1,
        name: "팀 1",
        description: "2024-2학기 소프트웨어공학 팀플",
        members: ["김00", "이00", "최00", "박00"],
        image: "https://via.placeholder.com/70", // 예시 이미지 URL
      },
      {
        id: 2,
        name: "졸프 팀",
        description: "졸업을 위하여...",
        members: ["김00", "이00", "최00", "박00"],
        image: "https://via.placeholder.com/70", // 예시 이미지 URL
      },
      {
        id: 3,
        name: "밴드 소모임",
        description: "밴드를 합시다~",
        members: ["김00", "이00", "최00", "박00"],
        image: "https://via.placeholder.com/70", // 예시 이미지 URL
      },
      {
        id: 4,
        name: "팀 4",
        description: "2024-2학기 소프트웨어공학 팀플",
        members: ["김00", "이00", "최00", "박00"],
        image: "https://via.placeholder.com/70", // 예시 이미지 URL
      },
    ];

    // 예시 데이터를 상태에 설정
    setGroups(exampleGroups);
  }, []);

  const openInviteModal = () => setIsInviteModalOpen(true);
  const closeInviteModal = () => setIsInviteModalOpen(false);

  const openDeleteModal = (group) => {
    setSelectedGroup(group); // 선택된 그룹 정보 저장
    setIsDeleteModalOpen(true); // 삭제 모달 열기
  };

  const closeDeleteModal = () => {
    setSelectedGroup(null); // 선택된 그룹 정보 초기화
    setIsDeleteModalOpen(false);
  };

  const handleInviteSubmit = () => {
    console.log("초대코드 제출!");
    closeInviteModal();
  };

  const handleDeleteConfirm = () => {
    // 그룹 삭제 처리 로직
    setGroups(groups.filter((group) => group.id !== selectedGroup.id)); // 선택된 그룹 삭제
    closeDeleteModal();
  };

  return (
    <>
      <div className="group-page">
        <header className="group-header">
          <h2>그룹 관리</h2>
        </header>

        <div className="group-content">
          <div className="add-group-content">
            <button className="in-group-button" onClick={openInviteModal}>
              그룹 참가하기
            </button>
            <Link to="/create-group">
              <button className="add-group-button">+ 그룹 생성하기</button>
            </Link>
          </div>
          {groups.length === 0 ? (
            <p className="no-group-text">그룹이 없어요.</p>
          ) : (
            groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onDelete={() => openDeleteModal(group)} // 삭제 버튼 클릭 시 삭제 모달 열기
              />
            ))
          )}
        </div>
      </div>

      {/* 초대 모달 */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        onSubmit={handleInviteSubmit}
      />

      {/* 삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
        groupName={selectedGroup ? selectedGroup.name : ""}
      />
    </>
  );
}

export default GroupPage;
