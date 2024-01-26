"use client";

import { faAdd, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import Card from "./card";
import { toast } from "react-toastify";

interface DutyProps {
  id: number;
  user: string;
  duties: Duty[];
  setDuties: Dispatch<SetStateAction<Dutie[]>>;
}

interface Duty {
  id: number,
  title: string;
  isCompleted: boolean;
}

interface DutyDelete extends Duty {
  error?: string
}

export default function Duty({ id, user, duties, setDuties }: DutyProps) {
  const [dutyList, setDutyList] = useState(duties);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCheckboxChange = async (index: number) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ dutie_id: dutyList[index]["id"] }),
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
      body: JSON.stringify({ dutie_id: dutyList[index]["id"] }),
    };
    const dutie = await fetch("/api/dutie", options)
      .then((res) => res.json())
      .then((data: DutyDelete) => {
        return data;
      });
    if ("error" in dutie) {
      toast.error(`Wystąpił błąd: ${dutie.error}`);
      return;
    }
    setDutyList((dutyList) => {
      return dutyList.filter((dutie) => dutie.id != dutyList[index]["id"])
    })
    setDuties((duties) => {
      return duties.map((dutie) => {
        if (dutie.id != id) {
          return dutie
        }
        dutie.duties.splice(index, 1)
        return dutie
      })
    })
    toast.success("Pomyślnie usunięto obowiązek");
  }
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
