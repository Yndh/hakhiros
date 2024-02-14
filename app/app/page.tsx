"use client";

import "../globals.css";
import { AppLayout } from "../components/appLayout";
import Note from "../components/note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../components/card";
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import useUserHouseId from "@/store/useUserHouseId";
import Invate from "../components/invite";
import MemberList from "../components/memberList";

interface Dutie {
  id: number;
  title: string;
  is_done: boolean;
}

interface Event {
  date: string;
  title: string;
}

export default function Dashboard() {
  const [code, setCode] = useState<string>("");
  const [duties, setDuties] = useState<Dutie[]>([]);
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const user_house_id = useUserHouseId()
  const [members, setMembers] = useState<Members>({});
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User>({ name: "test" });

  useEffect(() => {
    if (user_house_id == "" || user_house_id == "-1") {
      return
    }
    //members
    fetch(`/api/members?user_house_id=${user_house_id}`)
      .then((res) => res.json())
      .then((data: Members | ErrorRespone) => {
        if ("error" in data) {
          toast.error(`Wystąpił błąd: ${data["error"]}`);
          return;
        }
        setMembers(data);
      });
    //note
    fetch(`/api/note?user_house_id=${user_house_id}`)
      .then((res) => res.json())
      .then((data: Note[] | ErrorRespone) => {
        if ("error" in data) {
          toast.error(`Wystąpił błąd: ${data["error"]}`);
          return;
        }
        setNotes(data)
      })
    //duties
    const d = new Date();
    fetch(`/api/dutie?user_house_id=${user_house_id}&week_day=${d.getDay()}`)
      .then((res) => res.json())
      .then((data: Dutie[] | ErrorRespone) => {
        if ("error" in data) {
          toast.error(`Wystąpił błąd: ${data["error"]}`);
          return;
        }
        setDuties(data);
      });
    //events
    fetch(`/api/calendar?user_house_id=${user_house_id}&amount=4`)
      .then((res) => res.json())
      .then((data: calendarGetResponse) => {
        if ("error" in data) {
          toast.error(`Wystąpił błąd: ${data["error"]}`);
          return;
        }
        const event_data = data.map((event) => ({
          date: new Date(event.start).toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
          title: event.title,
        }));
        setEvents(event_data);
      });
  }, [user_house_id]);

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
      toast.error(`Wystąpił błąd: ${dutie["error"]}`);
      return;
    }
    setDuties((duties) => {
      duties[index].is_done = dutie.is_done;
      return [...duties];
    });
  };

  const renderPinnedNote = () => {
    {
      const pinnedNote = notes.find((note) => note.isPinned === true);

      return pinnedNote ? (
        <Note
          key={pinnedNote.id}
          id={pinnedNote.id}
          isPinned={true}
          title={pinnedNote.title}
          description={pinnedNote.description}
          setNotes={setNotes}
          color={pinnedNote.color}
        />
      ) : (
        <Card classes="center">
          <h2>Brak przypiętych notatek</h2>
        </Card>
      );
    }
  };
  return (
    <AppLayout
      active="dashboard"
      setCode={setCode}
      setUser={setUser}
      setTriggerRerender={setTriggerRerender}
    >
      <div className="header">
        <div className="collumn">
          <span>Witaj Ponownie,</span>
          <h1>{user["display_name"] ? user["display_name"] : user["name"]}</h1>
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

            {duties.length > 0 ? (
              <Card>
                <h2 className="title">Obowiązki na dziś</h2>
                <div className="dutyRow">
                  <ol className="duties">
                    {duties.map((duty, index) => (
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
                    ))}
                  </ol>
                </div>
              </Card>
            ) : (
              <Card classes="center">
                <h2>Nie masz żadnych obowiązków na dziś</h2>
              </Card>
            )}

            {events.length < 0 ? (
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
            ) : (
              <Card classes="center">
                <h2>Nie masz żadnych wydarzeń</h2>
              </Card>
            )}

            {renderPinnedNote()}
          </div>
        </div>

        <div className="collumn one">
          <Invate code={code} />

          <MemberList members={members} />
        </div>
      </div>
    </AppLayout>
  );
}
