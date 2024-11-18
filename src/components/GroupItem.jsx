import React from "react";
import "./GroupItem.css";
import selectedAllGroupImage from "../assets/selected-all-group-image.png";

const GroupItem = ({ group, onClick, isSelected }) => {
  const isAllGroup = group.groupId === null; // 그룹 ID가 null인지 확인

  return (
    <div
      className={`group-item ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(group.groupId)}
    >
      {group.groupImg ? (
        <img
          src={
            isAllGroup && isSelected
              ? selectedAllGroupImage // 선택된 경우 다른 이미지 사용
              : group.groupImg // 기본 이미지
          }
          alt={group.groupName || "전체"}
          className={
            isAllGroup
              ? isSelected
                ? "all-group-img-selected" // isAllGroup 참이고 isSelected 참
                : "all-group-img" // isAllGroup 참이고 isSelected 거짓
              : isSelected
              ? "group-img-selected" // isAllGroup 거짓이고 isSelected 참
              : "group-img" // isAllGroup 거짓이고 isSelected 거짓
          }
        />
      ) : (
        <div
          className={`${
            isSelected ? "placeholder-box-selected" : "placeholder-box"
          }`}
        ></div>
      )}
      <span className={`${isSelected ? "group-name-selected" : "group-name"}`}>
        {group.groupName}
      </span>
    </div>
  );
};

export default GroupItem;
