import React from "react";
import "./BackButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BiArrowBack } from "react-icons/bi"; // 뒤로 가기 아이콘

const BackButton = ({ onClick }) => {
  return (
    // <button onClick={onClick} className="back-button">
    //   <FontAwesomeIcon icon={faArrowLeft} />
    // </button>
    <BiArrowBack size={25} style={{ cursor: "pointer" }} onClick={onClick} />
  );
};

export default BackButton;
