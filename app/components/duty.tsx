"use client";

import { faAdd, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface DutyProps {
  id: number;
  user: string;
  duties: Duty[];
  weekDay: number;
}

interface Duty {
  title: string;
  isCompleted: boolean;
}

export default function Duty({ id, user, duties, weekDay }: DutyProps) {
  const [dutyList, setDutyList] = useState(duties);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCheckboxChange = (index: number) => {
    const updatedDutyList = [...dutyList];
    updatedDutyList[index].isCompleted = !updatedDutyList[index].isCompleted;
    setDutyList(updatedDutyList);

    console.table(dutyList);
  };

  const toggleModal = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    setModalOpen(!modalOpen);
    console.log(`duty = ${modalOpen}`);
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
              <FontAwesomeIcon icon={faTrash} onClick={toggleModal} />
            </li>
          ))}
        </ol>
      </div>

      <div className={`modal ${modalOpen ? "shown" : ""}`}>
        <div className="modalCard">
          <h2 className="center">Czy napewno chcesz usunąć ten element</h2>
          <div className="rowContainer">
            <button className="border red" onClick={toggleModal}>
              Anuluj
            </button>
            <button className="danger" onClick={toggleModal}>
              Usuń
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
