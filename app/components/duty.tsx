"use client";

import { faAdd, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import Card from "./card";
import { toast } from "react-toastify";

interface DutyProps {
  user: string;
  duties: Duty[];
  weekDay: number;
  setDuties: Dispatch<SetStateAction<Dutie[]>>
}

interface Duty {
  id: number,
  title: string;
  isCompleted: boolean;
}

export default function Duty({ user, duties, weekDay, setDuties }: DutyProps) {
  const [dutyList, setDutyList] = useState(duties);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCheckboxChange = async (index: number) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ dutie_id: duties[index]["id"] }),
    };
    const dutie = await fetch("/api/dutie", options)
      .then((res) => res.json())
      .then((data: DutieFetch) => {
        return data;
      });
    if ("error" in dutie) {
      toast.error(`Wystąpił błąd: ${dutie["error"]}`);
      return
    }
    const updatedDutyList = [...dutyList];
    updatedDutyList[index].isCompleted = !updatedDutyList[index].isCompleted;
    setDutyList(updatedDutyList);
  };

  const toggleModal = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    setModalOpen(!modalOpen);
  };

  const deleteDutie = async (index: number) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify({ dutie_id: duties[index]["id"] }),
    };
    /* const dutie = await fetch("/api/dutie", options)
      .then((res) => res.json())
      .then((data: NoteFetch) => {
        const datetime_node: Note = {
          ...data,
          createdAt: new Date(data["createdAt"]),
        };
        return datetime_node;
      });
    if ("error" in dutie) {
      toast.error(`Wystąpił błąd: ${dutie.error}`);
      return;
    } */
    let new_duties = duties.filter((dutie) => dutie.id !== duties[index]["id"])
    setDuties((duties2) => {
      duties2[weekDay - 1]["duties"] = new_duties
      return { ...duties2 }
    })
    toast.success("Pomyślnie usunięto obowiązek");
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
              <FontAwesomeIcon icon={faTrash} onClick={() => deleteDutie(index)} />
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
            <button className="danger" >
              Usuń
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
