"use client";

import React, { useState } from "react";

import {
  faAdd,
  faBell,
  faCalendarDays,
  faCarrot,
  faCheck,
  faEnvelope,
  faExclamation,
  faHammer,
  faHouse,
  faList,
  faPenToSquare,
  faShare,
  faThumbTack,
  faUser,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const functionOptions = {
  Domy: {
    icon: faHouse,
    mockup: "/Mockups/Dashboard.png",
    mockupMobile: "/Mockups/DashboardMobile.png",
    content: [
      {
        content: "Utwórz Dom",
        icon: faAdd,
      },
      {
        content: "Zaproś użytkowników",
        icon: faEnvelope,
      },
      {
        content: "Zarządzaj użytkownikami",
        icon: faHammer,
      },
    ],
  },
  Kalendarz: {
    icon: faCalendarDays,
    mockup: "/Mockups/Kalendarz.png",
    mockupMobile: "/Mockups/KalendarzMobile.png",
    content: [
      {
        content: "Utwórz wydarzenia",
        icon: faAdd,
      },
      {
        content: "Udostepniaj wydarzenia dla całej rodziny",
        icon: faShare,
      },
    ],
  },
  Notatki: {
    icon: faPenToSquare,
    mockup: "/Mockups/Notatki.png",
    mockupMobile: "/Mockups/NotatkiMobile.png",
    content: [
      {
        content: "Twórz notatki",
        icon: faAdd,
      },
      {
        content: "Przypinaj notatki",
        icon: faThumbTack,
      },
      {
        content: "Udostepniaj je dla całej rodziny",
        icon: faShare,
      },
    ],
  },
  Obowiązki: {
    icon: faBell,
    mockup: "/Mockups/Obowiazki.png",
    mockupMobile: "/Mockups/ObowiazkiMobile.png",
    content: [
      {
        content: "Twórz obowiązki na każdy dzień tygodnia",
        icon: faAdd,
      },
      {
        content: "Przypisuj obowiązki wybranym użytkownikom",
        icon: faUser,
      },
      {
        content: "Odchaczaj wykonane obowiązki",
        icon: faCheck,
      },
    ],
  },
  Przepisy: {
    icon: faUtensils,
    mockup: "/Mockups/Przepisy.png",
    mockupMobile: "/Mockups/PrzepisyMobile.png",
    content: [
      {
        content: "Odkrywaj nowe przepisy",
        icon: faUtensils,
      },
      {
        content: "Poziomy trudności",
        icon: faExclamation,
      },
      {
        content: "Lista składnikow",
        icon: faCarrot,
      },
      {
        content: "Kroki przygotowania",
        icon: faList,
      },
    ],
  },
};

export default function AppFunction() {
  const [selectedFunction, setSelectedFunction] = useState("Domy");

  const handleFunctionSelect = (functionName: string) => {
    setSelectedFunction(functionName);
  };

  const contentArray = functionOptions[selectedFunction].content;
  const halfContentLength = Math.ceil(contentArray.length / 2);
  const firstHalfContent = contentArray.slice(0, halfContentLength);
  const secondHalfContent = contentArray.slice(halfContentLength);

  return (
    <>
      <div className="functionSelect">
        <ul>
          {Object.keys(functionOptions).map((functionName) => (
            <li
              key={functionName}
              className={selectedFunction === functionName ? "active" : ""}
              onClick={() => handleFunctionSelect(functionName)}
            >
              <FontAwesomeIcon icon={functionOptions[functionName].icon} />
              {functionName}
            </li>
          ))}
        </ul>
      </div>

      <div className="functionContent">
        <div className="functionContentColumn">
          {firstHalfContent.map((item, index) => (
            <div className="functionContentColumnElement">
              <p key={index}>{item.content}</p>
              <FontAwesomeIcon icon={item.icon} />
            </div>
          ))}
        </div>

        <img src={functionOptions[selectedFunction].mockup} alt="Desktop Mockup" className="pc"/>
        <img src={functionOptions[selectedFunction].mockupMobile} alt="Mobile Mockup" className="mobile"/>

        <div className="functionContentColumn">
          {secondHalfContent.map((item, index) => (
            <div className="functionContentColumnElement">
              <FontAwesomeIcon icon={item.icon} />
              <p key={index}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
