import React from "react";
import "./MyPageItem.css";

const MyPageItem = ({ title, onClick }) => {
  return (
    <div className="my-page-item" onClick={onClick}>
      <span className="my-page-item-title">{title}</span>
      <span className="my-page-item-arrow">›</span>
    </div>
  );
};

export default MyPageItem;
