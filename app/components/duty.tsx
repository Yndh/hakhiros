"use client";

import { faAdd, faClose } from "@fortawesome/free-solid-svg-icons";
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
      )}
    </>
  );
}
