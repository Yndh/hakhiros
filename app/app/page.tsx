"use client";

import "../globals.css";
import { AppLayout } from "../components/appLayout";
import Note from "../components/note";
import Duty from "../components/duty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCrown,
  faShare,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
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

  const events = [
    {
      date: new Date().toLocaleDateString("pl-PL"),
      title: "Spotkanie",
    },
    {
      date: new Date().toLocaleDateString("pl-PL"),
      title: "Rodzinny Obiad",
    },
    {
      date: new Date().toLocaleDateString("pl-PL"),
      title: "Teo",
    },
    {
      date: new Date().toLocaleDateString("pl-PL"),
      title: "Test",
    },
  ];

  const shareHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await navigator.share({
        title: "Zaprosznie do domu",
        text: "Dołącz do mojego domu",
        url: "https://www.google.com",
      });
    } catch (err) {
      alert(`Nie można udostępnić: ${err}`);
    }
  };

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
          <div className="newCardRow">
            <Card classes="full">
              <h2 className="title">Witaj w swoim Domu</h2>
              <p className="welcome">
                Witaj w Dashboardzie swojego domu, sercu twojej organizacji
                domowych spraw. Tutaj, w jednym miejscu, znajdziesz wszystkie
                niezbędne narzędzia do efektywnego zarządzania życiem w swoim
                domu.
              </p>
              <p className="welcomeInfo">
                Przypięte notatki są jak osobisty korkowy kalendarz na drzwiach
                lodówki, ale w wersji cyfrowej. Zapisz tu swoje przemyślenia,
                ważne informacje czy ulubione cytaty. To miejsce, w którym każdy
                członek rodziny może podzielić się swoimi myślami i pomysłami.
              </p>
              <p className="welcomeInfo">
                Obowiązki na dziś to lista zadań, które czekają na ciebie i
                innych mieszkańców domu. Dzięki temu możesz być pewien, że żadne
                obowiązki nie zostaną pominięte. Wspólnie ustalcie, kto robi co
                w danym dniu, a życie stanie się zorganizowane i efektywne.
              </p>
              <p className="welcomeInfo">
                Najbliższe wydarzenia to twój kalendarz, który pomoże ci śledzić
                plany i zobowiązania. Od ważnych spotkań po urodziny, wszystko
                jest tu widoczne, dzięki czemu nigdy nic nie umknie twojej
                uwadze.
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
              <div className="datesContainer">
                {events.map((event, index) => (
                  <p className="dateText">
                    <span className="date">{event.date.toString()}</span>
                    <span className="dateDesc">{event.title}</span>
                  </p>
                ))}
              </div>
            </Card>

            {/* <Note
              id={1}
              isPinned={true}
              title="Notatka"
              description="balsbalsbalsbals"
            /> */}
            <Card classes="center">
              <h2>Brak przypiętych notatek</h2>
            </Card>
          </div>
        </div>

        <div className="collumn one">
          <Card>
            <h2 className="title">Zaproszenie</h2>
            <div className="qrCode">
              <QRCode value={"dupa12"} width={256} style={{ height: "auto" }} />
              <span className="or">lub</span>
              <button className="box" onClick={shareHandler}>
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
