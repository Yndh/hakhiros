import "../globals.css";
import { AppLayout } from "../components/appLayout";
import Note from "../components/note";
import Duty from "../components/duty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCrown, faShare } from "@fortawesome/free-solid-svg-icons";
import QRCode from "react-qr-code";
import Card from "../components/card";

export default function Dashboard() {
  const duties = [
    {
      title: "spotkanie",
      isCompleted: false,
    },
    {
      title: "zakupy",
      isCompleted: true,
    },
  ];

  return (
    <AppLayout active="dashboard">
      <div className="header">
        <div className="collumn">
          <span>Witaj Ponownie,</span>
          <h1>Użytkownik</h1>
        </div>
      </div>

      <div className="dashboard">
        <div className="collumn two">
          <Card classes="full">
            <h2 className="title">Witaj</h2>
            <p className="desc">
              Witaj w Dashboardzie swojego domu. Tutaj wszystkie rzeczy masz pod
              ręką - przypięte notatki, obowiazki na dziś i najbliższe
              wydarzenia
            </p>
          </Card>

          <Card>
            <h2 className="title">Obowiązki na dziś</h2>
            <div className="dutyRow">
              <ol className="duties">
                {duties.map((duty, index) => (
                  <li key={index}>
                    <label htmlFor={`checkMe${index}`}>
                      <input
                        type="checkbox"
                        id={`checkMe${index}`}
                        // checked={duty.isCompleted}
                        // onChange={() => handleCheckboxChange(index)}
                      />
                      <span>{duty.title}</span>
                    </label>
                  </li>
                ))}
              </ol>
            </div>
          </Card>

          <Card>
            <h2 className="title">Najbliższe Wydarzenia</h2>
          </Card>

          <Card>
            <h2 className="title">Przypięte notatki</h2>
          </Card>
        </div>

        <div className="collumn one">
          <Card>
            <h2 className="title">Zaproszenie</h2>
            <div className="qrCode">
              <QRCode value={"dupa12"} width={256} style={{ height: "auto" }} />
              <span className="or">lub</span>
              <button className="box">
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
            <button>
              <FontAwesomeIcon icon={faCopy} />
              Kopiuj Zaproszenie
            </button>
          </Card>

          <Card>
            <h2 className="title">Użytkownicy</h2>
            <ul className="userList">
              <li>
                <span className="username">
                  Bogdan <FontAwesomeIcon icon={faCrown} />
                </span>
                <span className="handle">Owner</span>
              </li>
              <li>
                <span className="username">Maria</span>
                <span className="handle">uzytkownik1</span>
              </li>
              <li>
                <span className="username">Maciuś</span>
                <span className="handle">Mordziaty2137</span>
              </li>
              <li>
                <span className="username">Tadek</span>
                <span className="handle">TeoRzechy</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
