"use client";

import { AppLayout } from "@/app/components/appLayout";
import Duty from "@/app/components/duty";
import {
  faArrowLeft,
  faArrowRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Duties() {
  const [weekDay, setWeekDay] = useState(new Date().getDay());
  const [modalOpen, setModalOpen] = useState(false);

  const weekDaysNames = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  const duties = [
    {
      id: 1,
      user: "uzytkownik5",
      duties: [
        {
          title: "spotkanie",
          isCompleted: false,
        },
        {
          title: "zakupy",
          isCompleted: true,
        },
      ],
      weekDay: 4,
    },
    {
      id: 2,
      user: "uzytkownik6",
      duties: [
        {
          title: "guwno",
          isCompleted: true,
        },
        {
          title: "sranie",
          isCompleted: false,
        },
      ],
      weekDay: 5,
    },
    {
      id: 3,
      user: "uzytkownik3",
      duties: [
        {
          title: "inne",
          isCompleted: true,
        },
        {
          title: "spacer",
          isCompleted: true,
        },
      ],
      weekDay: 5,
    },
    {
      id: 4,
      user: "uzytkownik7",
      duties: [
        {
          title: "praca",
          isCompleted: false,
        },
      ],
      weekDay: 6,
    },
  ];

  const handlePrevDay = () => {
    const newWeekDay = (weekDay + 6) % 7;
    setWeekDay(newWeekDay);
  };

  const handleNextDay = () => {
    const newWeekDay = (weekDay + 1) % 7;
    setWeekDay(newWeekDay);
  };

  const filteredDuties = duties.filter((duty) => duty.weekDay === weekDay);

  const id = 1;

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setModalOpen(!modalOpen);
  };

  return (
    <AppLayout active="duties">
      <div className="header">
        <h1>Obowiązki</h1>
        <div className="row">
          <button onClick={toggleModal}>Utwórz</button>
        </div>
      </div>

      <div className="dutyRow">
        <div className="card center">
          <button className="box" onClick={handlePrevDay}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1>{weekDaysNames[weekDay]}</h1>
          <button className="box" onClick={handleNextDay}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <div className="dutyRow">
        {filteredDuties.length > 0 ? (
          filteredDuties.map((duty) => (
            <Duty
              id={duty.id}
              user={duty.user}
              duties={duty.duties}
              weekDay={duty.weekDay}
            />
          ))
        ) : (
          <div className="card center">
            <h3 className="thin">Nie ma żadnych obowiazków na ten dzien</h3>
          </div>
        )}
      </div>

      <div className={`modal ${modalOpen ? "shown" : ""}`}>
        <div className="modalCard">
          <FontAwesomeIcon
            icon={faClose}
            className="close"
            onClick={toggleModal}
          />
          <h2 className="title">Dodaj Obowiazek</h2>

          <p className="thin">Wybierz użytkownika</p>
          <div className="choiceRow">
            {/* Tutaj trzeba pokazac uzytkonikow domu */}
            <input type="radio" name={`users${id}`} id={`userId${id}`} />
            <label htmlFor={`userId${id}`}>@user</label>
          </div>

          <p className="thin">Wpisz obowiazek</p>
          <input type="text" placeholder="Wpisz obowiązek..." />

          <p className="thin">Wybierz dzień tygodnia</p>
          <div className="choiceRow">
            <input type="radio" name={`days${id}`} id={`ponId${id}`} />
            <label htmlFor={`ponId${id}`}>Pon</label>

            <input type="radio" name={`days${id}`} id={`wtId${id}`} />
            <label htmlFor={`wtId${id}`}>Wt</label>

            <input type="radio" name={`days${id}`} id={`srId${id}`} />
            <label htmlFor={`srId${id}`}>Śr</label>

            <input type="radio" name={`days${id}`} id={`czwId${id}`} />
            <label htmlFor={`czwId${id}`}>Czw</label>

            <input type="radio" name={`days${id}`} id={`ptId${id}`} />
            <label htmlFor={`ptId${id}`}>Pt</label>

            <input type="radio" name={`days${id}`} id={`sbId${id}`} />
            <label htmlFor={`sbId${id}`}>Sb</label>

            <input type="radio" name={`days${id}`} id={`ndzId${id}`} />
            <label htmlFor={`ndzId${id}`}>Ndz</label>
          </div>

          <button>Dodaj</button>
        </div>
      </div>
    </AppLayout>
  );
}
