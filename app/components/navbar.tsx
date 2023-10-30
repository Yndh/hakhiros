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
import { Dispatch, SetStateAction, useState } from "react";

interface NavBarProps {
  active: string;
  userHouses: UserHouse[]
  userHouseId: number
  setUserHouseId: Dispatch<SetStateAction<number>>
}
export const NavBar = (props: NavBarProps) => {
  console.log(props.userHouses)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("join");
  const [code, setCode] = useState("");
  const [houseName, setHouseName] = useState("");

  const dropdownToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = (e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.MouseEvent<HTMLElement, MouseEvent>) => {
    setModalOpen(!modalOpen);
    setDropdownOpen(false);
  };

  const changeModalType = (value: string) => {
    setModalType(value);
  };

  const codeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const houseNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHouseName(e.target.value);
  };

  return (
    <div className="navbar">
      <div className="top">
        <div className="homeSelect">
          <div className="homeSelectHeader" onClick={dropdownToggle}>
            <h2>{props.userHouses.length > 0 ? props.userHouses[props.userHouseId]["house"]["name"] : "ładowanie"}</h2>
            <FontAwesomeIcon
              icon={dropdownOpen ? faChevronUp : faChevronDown}
            />
          </div>
          <div className={`homeSelectOptions ${dropdownOpen ? "active" : ""}`}>
            <ol>
              {props.userHouses.map((user_house) => {
                return <li key={user_house["id"]}>
                  <FontAwesomeIcon icon={faHome} />
                  {user_house["house"]["name"]}
                </li>
              })}
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
          {modalType === "join" ? (
            <>
              <h2 className="title">Dołącz do Domu</h2>

              <p className="thin">Zaproszenie do domu</p>
              <input
                type="text"
                placeholder="8 znakowy kod"
                onChange={codeChangeHandler}
                value={code}
              />

              <div className="rowContainer">
                <button
                  className="border"
                  onClick={() => changeModalType("create")}
                >
                  Utwórz dom
                </button>
                <button>Dołącz</button>
              </div>
            </>
          ) : (
            <>
              <h2 className="title">Utwórz Dom</h2>

              <p className="thin">Nazwa domu</p>
              <input
                type="text"
                placeholder="np. Epicki Dom"
                onChange={houseNameChangeHandler}
                value={houseName}
              />

              <div className="rowContainer">
                <button
                  className="border"
                  onClick={() => changeModalType("join")}
                >
                  Dołącz do domu
                </button>
                <button>Utwórz</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
