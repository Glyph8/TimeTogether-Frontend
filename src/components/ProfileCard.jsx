// ProfileCard.js
import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ name, profileImage }) => {
  return (
    <div className="profile-card">
      <h2 className="profile-title">마이페이지</h2>
      <div className="profile-info">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <span className="profile-name">{name}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
