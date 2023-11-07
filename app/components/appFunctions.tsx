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
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FunctionOption {
  icon: IconDefinition;
  mockup: string;
  mockupMobile: string;
  content: { content: string; icon: IconDefinition }[];
}

const functionOptions: Record<string, FunctionOption> = {
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
        content: "Udostępniaj wydarzenia dla całej rodziny",
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
        content: "Udostępniaj je dla całej rodziny",
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
        content: "Lista składników",
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
  const [selectedFunction, setSelectedFunction] = useState<string>("Domy");

  const handleFunctionSelect = (functionName: string) => {
    setSelectedFunction(functionName);
  };

  const contentArray = (functionOptions[selectedFunction].content as FunctionOption['content']);
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
            <div key={index} className="functionContentColumnElement">
              <p>{item.content}</p>
              <FontAwesomeIcon icon={item.icon} />
            </div>
          ))}
        </div>

        <img src={functionOptions[selectedFunction].mockup} alt="Desktop Mockup" className="pc" />
        <img src={functionOptions[selectedFunction].mockupMobile} alt="Mobile Mockup" className="mobile" />

        <div className="functionContentColumn">
          {secondHalfContent.map((item, index) => (
            <div key={index} className="functionContentColumnElement">
              <FontAwesomeIcon icon={item.icon} />
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
