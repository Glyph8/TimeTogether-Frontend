import React from "react";
import "./MenuButton.css";
import { GiHamburgerMenu } from "react-icons/gi"; // 햄버거 아이콘

const MenuButton = ({ onClick }) => {
  return (
    // <button className="menu-button" onClick={onClick}>
    //   &#8801;
    // </button>
    <GiHamburgerMenu
      size={24}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    />
  );
};

export default MenuButton;
