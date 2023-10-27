"use client";

import { faAdd, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface DutyProps {
  user: string;
  duties: Duty[];
  weekDay: number;
}

interface Duty {
  title: string;
  isCompleted: boolean;
}

export default function Duty({ user, duties, date }: DutyProps) {
  const [dutyList, setDutyList] = useState(duties);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCheckboxChange = (index: number) => {
    const updatedDutyList = [...dutyList];
    updatedDutyList[index].isCompleted = !updatedDutyList[index].isCompleted;
    setDutyList(updatedDutyList);

    console.table(dutyList);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className="card">
        <h2 className="title">@{user}</h2>
        <ol className="duties">
          {dutyList.map((duty, index) => (
            <li key={index}>
              <label htmlFor={`check${user}${index}`}>
                <input
                  type="checkbox"
                  id={`check${user}${index}`}
                  checked={duty.isCompleted}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span>{duty.title}</span>
              </label>
            </li>
          ))}
          <li className="addDuty" onClick={toggleModal}>
            <FontAwesomeIcon icon={faAdd} />
            <span>Dodaj</span>
          </li>
        </ol>
      </div>
      {modalOpen && (
        <div className={`modal ${modalOpen ? "shown" : ""}`}>
          <div className="modalCard">
            <FontAwesomeIcon
              icon={faClose}
              className="close"
              onClick={toggleModal}
            />
            <h2 className="title">Dodaj Obowiazek</h2>

            <input type="text" placeholder="Wpisz obowiązek..." />

            <button>Dodaj</button>
          </div>
        </div>
      )}
    </>
  );
}
