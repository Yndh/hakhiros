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
} from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="homeSelect">
        <div className="homeSelectHeader">
          <span>Dom1</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>

      <ul>
        <a href="" className="active">
          <li>
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </li>
        </a>
        <a href="">
          <li>
            <FontAwesomeIcon icon={faCalendarDays} />
            Kalendarz
          </li>
        </a>
        <a href="">
          <li>
            <FontAwesomeIcon icon={faPenToSquare} />
            Notatki
          </li>
        </a>
        <a href="">
          <li>
            <FontAwesomeIcon icon={faBell} />
            Obowiązki
          </li>
        </a>
        <a href="">
          <li>
            <FontAwesomeIcon icon={faCalendarPlus} />
            Plan Dnia
          </li>
        </a>
      </ul>

      <ul>
        <a href="">
          <li>
            <FontAwesomeIcon icon={faCog} />
            Ustawienia
          </li>
        </a>
        <a href="">
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
  );
};
