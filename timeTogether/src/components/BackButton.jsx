import React from "react";
import "./BackButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="back-button">
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export default BackButton;
