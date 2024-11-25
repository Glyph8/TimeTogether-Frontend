import React from "react";
import BackButton from "./BackButton";
import "./Header.css";
import MenuButton from "./MenuButton";

const Header = ({ title, onBackClick, onMenuClick }) => {
  return (
    <div className="h-header">
      <BackButton onClick={onBackClick} />
      <div className="h-header-title">{title}</div>
      {/* <MenuButton onClick={onMenuClick} /> */}
    </div>
  );
};

export default Header;
