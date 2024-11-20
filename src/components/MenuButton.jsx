import React from "react";
import "./MenuButton.css";

const MenuButton = ({ onClick }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      &#8801;
    </button>
  );
};

export default MenuButton;
