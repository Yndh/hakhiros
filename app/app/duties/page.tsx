"use client";

import { AppLayout } from "@/app/components/appLayout";
import Duty from "@/app/components/duty";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Duties() {
  const [weekDay, setWeekDay] = useState(new Date().getDay());

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
      user: "uzytkownik1",
      duties: [
        {
          title: "sranie",
          isCompleted: true,
        },
        {
          title: "praca",
          isCompleted: false,
        },
        {
          title: "spotkanie",
          isCompleted: false,
        },
        {
          title: "zakupy",
          isCompleted: true,
        },
        {
          title: "spacer",
          isCompleted: false,
        },
        {
          title: "inne",
          isCompleted: true,
        },
      ],
      weekDay: 0,
    },
    {
      user: "uzytkownik2",
      duties: [
        {
          title: "praca",
          isCompleted: false,
        },
        {
          title: "spotkanie",
          isCompleted: true,
        },
      ],
      weekDay: 1,
    },
    {
      user: "uzytkownik3",
      duties: [
        {
          title: "zakupy",
          isCompleted: false,
        },
        {
          title: "spacer",
          isCompleted: true,
        },
      ],
      weekDay: 2,
    },
    {
      user: "uzytkownik4",
      duties: [
        {
          title: "praca",
          isCompleted: true,
        },
        {
          title: "inne",
          isCompleted: false,
        },
      ],
      weekDay: 3,
    },
    {
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

  return (
    <AppLayout active="duties">
      <div className="header">
        <h1>Obowiązki</h1>
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
        {filteredDuties.map((duty) => (
          <Duty user={duty.user} duties={duty.duties} weekDay={duty.weekDay} />
        ))}
      </div>
    </AppLayout>
  );
}
