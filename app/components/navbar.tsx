"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarDays,
  faPenToSquare,
  faBell,
  faCalendarPlus,
  faRightFromBracket,
  faCog,
  faUser,
  faChevronDown,
  faClose,
  faAdd,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface NavBarProps {
  active: string;
}
export const NavBar = (props: NavBarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dropdownToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setModalOpen(!modalOpen);
    setDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="top">
        <div className="homeSelect">
          <div className="homeSelectHeader" onClick={dropdownToggle}>
            <h2>Nazwa Domu</h2>
            <FontAwesomeIcon
              icon={dropdownOpen ? faChevronUp : faChevronDown}
            />
          </div>
          <div className={`homeSelectOptions ${dropdownOpen ? "active" : ""}`}>
            <ol>
              <li>
                <FontAwesomeIcon icon={faHome} />
                Dom1
              </li>
              <li>
                <FontAwesomeIcon icon={faHome} />
                Dom2
              </li>
              <li className="addHome" onClick={toggleModal}>
                <FontAwesomeIcon icon={faAdd} />
                Dołącz do domu
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="nav">
        <ul>
          <a
            href="/app"
            className={props.active == "dashboard" ? "active" : ""}
          >
            <li>
              <FontAwesomeIcon icon={faHome} />
              Dashboard
            </li>
          </a>
          <a
            href="/app/calendar"
            className={props.active == "calendar" ? "active" : ""}
          >
            <li>
              <FontAwesomeIcon icon={faCalendarDays} />
              Kalendarz
            </li>
          </a>
          <a
            href="/app/notes"
            className={props.active == "notes" ? "active" : ""}
          >
            <li>
              <FontAwesomeIcon icon={faPenToSquare} />
              Notatki
            </li>
          </a>
          <a
            href="/app/duties"
            className={props.active == "duties" ? "active" : ""}
          >
            <li>
              <FontAwesomeIcon icon={faBell} />
              Obowiązki
            </li>
          </a>
          <a
            href="/app/plan"
            className={props.active == "plan" ? "active" : ""}
          >
            <li>
              <FontAwesomeIcon icon={faCalendarPlus} />
              Plan Dnia
            </li>
          </a>
        </ul>

        <ul>
          <a
            href="/app/settings"
            className={props.active == "settings" ? "active" : ""}
          >
            <li>
              <FontAwesomeIcon icon={faCog} />
              Ustawienia
            </li>
          </a>
          <a
            href="/app/user"
            className={props.active == "user" ? "active" : ""}
          >
            <li>
              <FontAwesomeIcon icon={faUser} />
              Użytkownik
            </li>
          </a>
          <a href="">
            <li>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Wyloguj się
            </li>
          </a>
        </ul>
      </div>

      <div className={`modal ${modalOpen ? "shown" : ""}`}>
        <div className="modalCard">
          <FontAwesomeIcon
            icon={faClose}
            className="close"
            onClick={toggleModal}
          />
          <h2 className="title">Dołącz do Domu</h2>

          <input type="text" placeholder="8 znakowy kod" />

          <button>Dołącz</button>
        </div>
      </div>
    </div>
  );
};
