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
import { useEffect, useRef, useState } from "react";

interface Dutie {
  id: number
  title: string
  is_done: boolean
}

export default function Dashboard() {
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [code, setCode] = useState<string>("")
  const [duties, setDuties] = useState<Dutie[]>([]);

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

  const user_house_id = localStorage.getItem("user_house_id") || "-1";
  let prev_user_house_id = useRef("-1");
  const [members, setMembers] = useState<Members>({})
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    if (prev_user_house_id.current !== user_house_id) {
      //members
      fetch(`/api/members?user_house_id=${user_house_id}`)
        .then((res) => res.json())
        .then((data: Members | ErrorRespone) => {
          if ("error" in data) {
            console.log(data["error"]);
            return;
          }
          setMembers(data)
        })
      //note
      fetch(`/api/note?user_house_id=${user_house_id}&pinned=true`)
        .then((res) => res.json())
        .then((data: Note[] | ErrorRespone) => {
          if ("error" in data) {
            console.log(data["error"]);
            return;
          }
          console.log(data)
          setNotes(data)
        })
      //duties
      const d = new Date();
      fetch(`/api/dutie?user_house_id=${user_house_id}&week_day=${d.getDay()}`)
        .then((res) => res.json())
        .then((data: Dutie[] | ErrorRespone) => {
          if ("error" in data) {
            console.log(data["error"]);
            return;
          }
          setDuties(data)
        })
      prev_user_house_id.current = user_house_id;
    }
  })

  const shareHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await navigator.share({
        title: "Zaprosznie do domu",
        text: "Dołącz do mojego domu",
        url: `${window.location.protocol}//${window.location.hostname}/join/${code}`,
      });
    } catch (err) {
      alert(`Nie można udostępnić: ${err}`);
    }
  };

  const handleCheckboxChange = async (index: number) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ dutie_id: duties[index].id }),
    };
    const dutie = await fetch("/api/dutie", options)
      .then((res) => res.json())
      .then((data: DutieFetch) => {
        return data;
      });
    if ("error" in dutie) {
      console.log(dutie["error"])
      return
    }
    setDuties((duties) => {
      duties[index].is_done = dutie.is_done
      return [...duties]
    });
  };
  return (
    <AppLayout active="dashboard" setTriggerRerender={setTriggerRerender} setCode={setCode}>
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
                  {duties.length > 0 ?
                    duties.map((duty, index) => (
                      <li key={duty.id}>
                        <label htmlFor={`checkMe${index}`}>
                          <input
                            type="checkbox"
                            id={`checkMe${index}`}
                            checked={duty.is_done}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <span>{duty.title}</span>
                        </label>
                      </li>
                    )) : "nie masz obowiązków na dzisiaj"}
                </ol>
              </div>
            </Card>

            <Card>
              <h2 className="title">Najbliższe Wydarzenia</h2>
              <div className="datesContainer">
                {events.map((event, index) => (
                  <p className="dateText" key={index}>
                    <span className="date">{event.date.toString()}</span>
                    <span className="dateDesc">{event.title}</span>
                  </p>
                ))}
              </div>
            </Card>
            {notes.filter((note) => note.isPinned === true).length > 0 ?
              notes.filter((note) => note.isPinned === true).map((note) => <Note
                key={note.id}
                id={note.id}
                isPinned={true}
                title={note.title}
                description={note.description}
                setNotes={setNotes}
              />) :
              <Card classes="center">
                <h2>Brak przypiętych notatek</h2>
              </Card>
            }
          </div>
        </div>

        <div className="collumn one">
          <Card>
            <h2 className="title">Zaproszenie</h2>
            <div className="qrCode">
              <QRCode value={`${window.location.protocol}//${window.location.hostname}/join/${code}`} width={256} style={{ height: "auto" }} />
              <span className="or">lub</span>
              <button className="box" onClick={shareHandler}>
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
            <button onClick={()=>{navigator.clipboard.writeText(`${window.location.protocol}//${window.location.hostname}/join/${code}`);}}>
              <FontAwesomeIcon icon={faCopy} />
              Kopiuj Zaproszenie
            </button>
          </Card>

          <Card>
            <h2 className="title">Użytkownicy</h2>
            <ul className="userList">
              {Object.keys(members).map((key) => <li key={key}>
                <span className="username">
                  {members[key]["display_name"] ? members[key]["display_name"] : members[key]["name"]}
                  {members[key]["is_owner"] ? <FontAwesomeIcon icon={faCrown} /> : ""}
                </span>
                <span className="handle">{members[key]["name"]}</span>
              </li>)}
            </ul>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
