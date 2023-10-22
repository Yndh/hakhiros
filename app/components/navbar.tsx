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
} from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
  active: string;
}
export const NavBar = (props: NavBarProps) => {
  return (
    <div className="navbar">
      <div className="top">
        <div className="homeSelect">
          <h2>Nazwa Domu</h2>
        </div>
        <div className="close">
          <FontAwesomeIcon icon={faClose} />
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
    </div>
  );
};
