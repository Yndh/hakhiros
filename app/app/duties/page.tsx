"use client";

import { AppLayout } from "@/app/components/appLayout";
import Card from "@/app/components/card";
import Duty from "@/app/components/duty";
import Modal from "@/app/components/modal";
import {
  faArrowLeft,
  faArrowRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";

export default function Duties() {
  const [weekDay, setWeekDay] = useState(new Date().getDay());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [dutyTitle, setDutyTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);

  const weekDaysNames = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  const users = ["user", "teo", "rzechy"];

  const [duties, setDuties] = useState([
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
  ]);

  const handlePrevDay = () => {
    const newWeekDay = (weekDay + 6) % 7;
    setWeekDay(newWeekDay);
  };

  const handleNextDay = () => {
    const newWeekDay = (weekDay + 1) % 7;
    setWeekDay(newWeekDay);
  };

  const filteredDuties = duties.filter((duty) => duty.weekDay === weekDay);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCreateDuty = () => {
    const newDuty = {
      id: duties.length + 1,
      user: selectedUser,
      duties: [
        {
          title: dutyTitle,
          isCompleted: false,
        },
      ],
      weekDay: selectedDay,
    };

    setDuties([...duties, newDuty]);
    setSelectedUser("");
    setDutyTitle("");
    setSelectedDay(new Date().getDay());
    toggleModal();
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
        <Card classes="center">
          <button className="box" onClick={handlePrevDay}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1>{weekDaysNames[weekDay]}</h1>
          <button className="box" onClick={handleNextDay}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Card>
      </div>

      <div className="dutyRow">
        {filteredDuties.length > 0 ? (
          filteredDuties.map((duty) => (
            <Duty
              key={duty.id}
              id={duty.id}
              user={duty.user}
              duties={duty.duties}
              weekDay={duty.weekDay}
            />
          ))
        ) : (
          <Card classes="center">
            <h3 className="thin">Nie ma żadnych obowiazków na ten dzien</h3>
          </Card>
        )}
      </div>

      <Modal isOpen={modalOpen}>
        <FontAwesomeIcon
          icon={faClose}
          className="close"
          onClick={toggleModal}
        />
        <h2 className="title">Dodaj Obowiazek</h2>

        <p className="thin">Wybierz użytkownika</p>
        <div className="choiceRow">
          {users.map((user, index) => (
            <Fragment key={index}>
              <input
                type="radio"
                name="selectedUser"
                id={`selectedUser${user}`}
                onChange={() => setSelectedUser(user)}
              />
              <label htmlFor={`selectedUser${user}`}>@{user}</label>
            </Fragment>
          ))}
        </div>

        <p className="thin">Wpisz obowiazek</p>
        <input
          type="text"
          placeholder="Wpisz obowiązek..."
          value={dutyTitle}
          onChange={(e) => setDutyTitle(e.target.value)}
        />

        <p className="thin">Wybierz dzień tygodnia</p>
        <div className="choiceRow">
          {[...weekDaysNames.slice(1), weekDaysNames[0]].map(
            (dayName, index) => {
              const dayIndex = (index + 1) % 7;
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="selectedDay"
                    id={`selectedDay${dayIndex}`}
                    value={dayIndex}
                    onChange={() => setSelectedDay(dayIndex)}
                    checked={selectedDay === dayIndex}
                  />
                  <label htmlFor={`selectedDay${dayIndex}`}>
                    {dayName.slice(0, 3)}
                  </label>
                </div>
              );
            }
          )}
        </div>

        <button onClick={handleCreateDuty}>Dodaj</button>
      </Modal>
    </AppLayout>
  );
}
