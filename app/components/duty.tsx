"use client";

import { faAdd, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import Card from "./card";

interface DutyProps {
  id: number;
  user: string;
  duties: Duty[];
  weekDay: number;
  setDuties: Dispatch<SetStateAction<Dutie[]>>
}

interface Duty {
  title: string;
  isCompleted: boolean;
}

export default function Duty({ id, user, duties, weekDay, setDuties }: DutyProps) {
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
  };

  const deleteNode = async (e: React.MouseEvent<any, MouseEvent>) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify({ dutie_id: id }),
    };
    const dutie = await fetch("/api/dutie", options)
      .then((res) => res.json())
      .then((data: NoteFetch) => {
        const datetime_node: Note = {
          ...data,
          createdAt: new Date(data["createdAt"]),
        };
        return datetime_node;
      });
    if ("error" in dutie) {
      console.log(dutie.error);
      return;
    }
    setDuties((duties) => duties.filter((dutie: any) => dutie.id !== id));
    toggleModal(e);
  };

  return (
    <>
      <Card>
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
      </Card>

      <div className={`modal ${modalOpen ? "shown" : ""}`}>
        <div className="modalCard">
          <h2 className="center">Czy napewno chcesz usunąć ten element</h2>
          <div className="rowContainer">
            <button className="border red" onClick={toggleModal}>
              Anuluj
            </button>
            <button className="danger" onClick={deleteNode}>
              Usuń
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
