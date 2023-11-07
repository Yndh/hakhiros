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
  faUtensils,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavBarProps {
  active: string;
  setTriggerRerender: Dispatch<SetStateAction<boolean>> | undefined;
  setCode: Dispatch<SetStateAction<string>> | undefined
  setUser: Dispatch<SetStateAction<User>> | undefined
}
export const NavBar = (props: NavBarProps) => {
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("join");
  const [code, setCode] = useState("");
  const [houseName, setHouseName] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [houses, setHouses] = useState<Houses>({});
  const [userHouseId, setUserHouseId] = useState<string>(
    typeof window !== "undefined"
      ? window.localStorage.getItem("user_house_id") || "0"
      : "0"
  );
  const [userHouseName, setUserHouseName] = useState<string>("");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState<User>({})

  useEffect(() => {
    fetch("/api/house")
      .then((res) => res.json())
      .then((data: Houses) => {
        if (Object.keys(data).length === 0) {
          router.push("/app/newUser")
          return
        }
        setHouses(data);
        const id =
          localStorage.getItem("user_house_id") || Object.keys(data)[0];
        setUserHouseId(id);
        localStorage.setItem("user_house_id", id);
        if (props.setTriggerRerender) {
          props.setTriggerRerender(
            (triggerRerender: boolean) => !triggerRerender
          );
          if (props.setCode) {
            props.setCode(data[Object.keys(data)[0]]["code"])
          }
        }
      }).then(() => {
        fetch(`/api/user?user_house_id=${userHouseId}`)
          .then((res) => res.json())
          .then((data: User | ErrorRespone) => {
            if ("error" in data) {
              console.log(data["error"])
              return
            }
            setUser(data)
            if (props.setUser) {
              props.setUser(data)
            }
          })
      }).then(() => {
        if (props.setTriggerRerender) {
          props.setTriggerRerender((triggerRerender) => !triggerRerender)
        }
      })
  }, []);

  const dropdownToggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | null
  ) => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
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

  const toggleSettings = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLOrSVGElement, MouseEvent>
  ) => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleUser = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLOrSVGElement, MouseEvent>
  ) => {
    setUserOpen(!userOpen);
  };

  const chooseHouse = (user_house_id: string) => {
    setUserHouseId(user_house_id);
    dropdownToggle(null);
    localStorage.setItem("user_house_id", user_house_id);
    if (props.setCode) {
      props.setCode(houses[user_house_id]["code"])
    }
    fetch(`/api/user?user_house_id=${userHouseId}`)
      .then((res) => res.json())
      .then((data: User | ErrorRespone) => {
        if ("error" in data) {
          console.log(data["error"]);
          return;
        }
        setUser(data)
        if (props.setUser) {
          props.setUser(data)
        }
      })
    if (props.setTriggerRerender) {
      props.setTriggerRerender((triggerRerender: boolean) => !triggerRerender);
    }
  };

  const createHouse = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (houseName.trim() === "") {
      return;
    }
    const options = {
      method: "POST",
      body: JSON.stringify({ house_name: houseName }),
    };
    const house = await fetch("/api/house", options)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if ("error" in house) {
      console.log(house.error);
      return;
    }
    setHouses((houses) => ({ ...houses, ...house }));
    const houseId = Object.keys(house)[0];
    setUserHouseId(houseId);
    localStorage.setItem("user_house_id", houseId);
    toggleModal(e);
    setHouseName("");
    if (props.setTriggerRerender) {
      props.setTriggerRerender((triggerRerender: boolean) => !triggerRerender);
    }
  };

  const joinHouse = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (code.trim() === "") {
      return;
    }
    const options = {
      method: "POST",
    };
    const house = await fetch(`/api/house/${code}`, options)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if ("error" in house) {
      console.log(house.error);
      return;
    }
    setHouses((houses) => ({ ...houses, ...house }));
    const houseId = Object.keys(house)[0];
    setUserHouseId(houseId);
    localStorage.setItem("user_house_id", houseId);
    toggleModal(e);
    setCode("");
    if (props.setTriggerRerender) {
      props.setTriggerRerender((triggerRerender: boolean) => !triggerRerender);
    }
  };

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserHouseName(e.target.value);
  };

  const toggleNavbar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setNavbarOpen(!navbarOpen);
  };

  const saveUserHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // TODO: zrobić tak żeby na dashboardzie zmieniała się nazwa użytkownika
    if (userHouseName === user.dispaly_name) {
      setUserOpen(false)
      return
    }
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        user_house_id: userHouseId,
        display_name: userHouseName
      })
    }
    const new_user = await fetch("/api/user", options)
      .then((res) => res.json())
      .then((data: User | ErrorRespone) => {
        if ("error" in data) {
          console.log(data.error)
          return
        }
        setUser(data)
        if (props.setUser) {
          props.setUser(data)
        }
      });
    setUserOpen(false)
  }

  return (
    <>
      <div className="openButton">
        <button onClick={toggleNavbar}>
          <FontAwesomeIcon icon={navbarOpen ? faClose : faBars} />
        </button>
      </div>
      <div className={`navbar ${navbarOpen ? "mobileOpen" : ""}`}>
        <div className="top">
          <div className="homeSelect">
            <div className="homeSelectHeader" onClick={dropdownToggle}>
              <h2>
                {Object.keys(houses).length > 0
                  ? houses[userHouseId]["name"]
                  : "ładowanie"}
              </h2>
              <FontAwesomeIcon
                icon={dropdownOpen ? faChevronUp : faChevronDown}
              />
            </div>
            <div
              className={`homeSelectOptions ${dropdownOpen ? "active" : ""}`}
            >
              <ol>
                {Object.keys(houses).map((key) => (
                  <li
                    key={key}
                    onClick={() => {
                      chooseHouse(key);
                    }}
                  >
                    <FontAwesomeIcon icon={faHome} />
                    {houses[key]["name"]}
                  </li>
                ))}
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
              href="/app/recepies"
              className={props.active == "recepies" ? "active" : ""}
            >
              <li>
                <FontAwesomeIcon icon={faUtensils} />
                Przepisy
              </li>
            </a>
          </ul>

          <ul>
            <a
              className={props.active == "settings" ? "active" : ""}
              onClick={toggleSettings}
            >
              <li>
                <FontAwesomeIcon icon={faCog} />
                Ustawienia
              </li>
            </a>
            <a
              onClick={toggleUser}
              className={props.active == "user" ? "active" : ""}
            >
              <li>
                <FontAwesomeIcon icon={faUser} />
                Użytkownik
              </li>
            </a>
            <a onClick={() => signOut()}>
              <li>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Wyloguj się
              </li>
            </a>
          </ul>
        </div>

        <Modal isOpen={settingsOpen}>
          <h2 className="title">Ustawienia</h2>
          <FontAwesomeIcon
            icon={faClose}
            className="close"
            onClick={toggleSettings}
          />

          {/* Dla ownera */}
          <p className="thin">Użytkownicy</p>
          <table className="users">
            <thead>
              <tr>
                <th>Użytkownik</th>
                <th>Data dolączenia</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>@user2137</td>
                <td>31.10.2023</td>
                <td>
                  <FontAwesomeIcon icon={faRightFromBracket} className="kick" />
                </td>
              </tr>

              <tr>
                <td>@user2</td>
                <td>31.10.2023</td>
                <td>
                  <FontAwesomeIcon icon={faRightFromBracket} className="kick" />
                </td>
              </tr>
            </tbody>
          </table>

          <button className="danger">
            <FontAwesomeIcon icon={faRightFromBracket} />
            Opuść dom
          </button>
        </Modal>

        {/* Do opuszczenia potwierdzenie to napiszcie */}
        {/* <Modal isOpen={"zmienna"}>
        <h2 className="center">Czy napewno chcesz opuścić ten dom</h2>
        <div className="rowContainer">
          <button className="border red" onClick={toggleModal}>
            Anuluj
          </button>
          <button className="danger" onClick={toggleModal}>
            Opuść dom
          </button>
        </div>
      </Modal> */}

        <Modal isOpen={userOpen}>
          <h2 className="title">Użytkownik</h2>
          <FontAwesomeIcon
            icon={faClose}
            className="close"
            onClick={toggleUser}
          />

          <p className="thin">Nazwa użytkownika</p>
          <input type="text" value={`@${user['name']}`} disabled />

          <p className="thin">Pseudonim</p>
          <input
            type="text"
            placeholder="Wpisz pseudonim..."
            value={userHouseName}
            onChange={userNameHandler}
          />

          <button onClick={saveUserHandler}>Zapisz</button>
        </Modal>

        <Modal isOpen={modalOpen}>
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
                <button onClick={joinHouse}>Dołącz</button>
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
                <button onClick={createHouse}>Utwórz</button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};
