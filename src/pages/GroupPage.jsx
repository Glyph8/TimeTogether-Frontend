import React, { useEffect, useState } from "react";
import "./GroupPage.css";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CreateGroup from "../components/CreateGroup";
import GroupCard from "../components/GroupCard";
import InviteModal from "../components/InviteModal";
import DeleteModal from "../components/DeleteModal"; // DeleteModal import
import axios from "axios";

function GroupPage() {
  // 로컬 스토리지에서 토큰 가져오기
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [groups, setGroups] = useState([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false); // 초대 모달 열림 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달 열림 상태
  const [selectedGroup, setSelectedGroup] = useState(null); // 삭제할 그룹 정보

  useEffect(() => {
    // 실제 백엔드 연결코드
    const fetchGroups = async () => {
      // console.log("액세스 토큰: ", { accessToken });
      console.log("fetchGroups 함수 호출됨");

      try {
        const response = await axios.get(
          "http://192.168.233.218:8080/group/groups/view",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.httpStatus === "OK") {
          console.log("응답 데이터:", response.data);

          // 새로운 데이터 구조에 맞게 변환
          const formattedData = response.data.data.map((group) => ({
            groupId: group.groupId,
            groupName: group.groupName,
            groupIntro: group.groupIntro,
            groupImg: group.groupImg,
            mgr: group.mgr,
            url: group.groupUrl,
            // members: group.userNameResponseList.map((user) => user.userName), // userNameResponseList에서 userName 추출
            groupMembers: group.userNameResponseList
              ? group.userNameResponseList
                  .map((user) => user.userName)
                  .join(", ")
              : "No Members",
          }));

          setGroups(formattedData);
        }
      } catch (error) {
        console.error("그룹 데이터를 가져오는 중 오류 발생:", error);

        // 에러 응답 처리
        if (error.response) {
          console.error("응답 코드:", error.response.status);
          console.error("응답 메시지:", error.response.data.message);
        }
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    // 새로운 배열 형식의 더미 응답 데이터
    axios
      .get("http://192.168.233.205:8080/header/group/groups/view")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(`groupPage에서 view요청 실패 ${err}`);
      });

    const exampleResponse = {
      message: "요청에 성공했습니다.",
      httpStatus: "OK",
      data: [
        {
          groupId: 2,
          groupName: "hello-world",
          groupIntro: "헬로우 월드",
          groupImg:
            // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL0mWBDKPR964fHPZTXR6e1Ul5QzsFpyPrBA&s",
            "https://img.freepik.com/premium-vector/crying-laptop-computer-isolated-emoticon_263753-2202.jpg",
          groupMembers: "김OO, 이OO, 박OO",
          groupMgrId: "118042957275397174302",
          mgr: true,
          url: "abcd-efg",
        },
        {
          groupId: 3,
          groupName: "미야옹",
          groupIntro: "미야옹 월드",
          groupImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJDsEehUFFYoZno3N0UGUrInuTXBK4adOXPw&s",
          groupMembers: "Alice, Bob",
          groupMgrId: "100682045992698191363",
          mgr: false,
          url: "hijklmnop",
        },
        {
          groupId: 4,
          groupName: "미야옹",
          groupIntro: "미야옹 월드",
          groupImg:
            "https://image.utoimage.com/preview/cp872722/2021/10/202110001984_500.jpg",
          groupMembers: "김OO",
          groupMgrId: "100682045992698191363",
        },
        {
          groupId: 5,
          groupName: "강아지",
          groupIntro: "강아지 월드",
          groupImg:
            "https://img.freepik.com/premium-vector/happy-laptop-computer-isolated-emoticon_263753-1622.jpg",
          groupMembers: null,
          groupMgrId: "100682045992698191363",
        },
      ],
    };

    // 더미 데이터를 상태에 설정
    setGroups(exampleResponse.data);
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
    setGroups(
      groups.filter((group) => group.groupId !== selectedGroup.groupId)
    ); // 선택된 그룹 삭제
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
                key={group.groupId}
                group={group}
                groups={groups}
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
        // onSubmit={handleInviteSubmit}
      />

      {/* 삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
        groupName={selectedGroup ? selectedGroup.groupName : ""}
        groupId={selectedGroup ? selectedGroup.groupId : ""}
        isManager={selectedGroup ? selectedGroup.mgr : false} // mgr 값을 전달
      />
    </>
  );
}

export default GroupPage;
