"use client";

import { faAdd, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Card from "./card";
import { toast } from "react-toastify";

interface DutyProps {
  id: number;
  user: string;
  dutys: Duty[];
  duties: Dutie[]
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

export default function Duty({ id, user, dutys, duties, setDuties }: DutyProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const deleteIndex = useRef(0)

  const handleCheckboxChange = async (index: number) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ dutie_id: duties.find((dutie) => dutie.id == id)?.duties[index].id }),
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
    const updatedDutyList = [...dutys];
    updatedDutyList[index].isCompleted = !updatedDutyList[index].isCompleted;
    setDuties((duties) => {
      return duties.map((dutie) => {
        if (dutie.id != id) {
          return dutie
        }
        dutie.duties = updatedDutyList
        return dutie
      })
    })
  };
  const toggleModal = (e?: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    setModalOpen(!modalOpen);
  };

  const deleteDutie = async (index: number) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify({ dutie_id: duties.find((dutie) => dutie.id == id)?.duties[index].id }),
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
    setDuties((duties) => {
      return duties.map((dutie) => {
        if (dutie.id != id || deleteIndex.current == -1) {
          return dutie
        }
        dutie.duties.splice(index, 1)
        deleteIndex.current = -1
        return dutie
      })
    })
    toggleModal()
    toast.success("Pomyślnie usunięto obowiązek");
  }
  return (
    <>
      <Card>
        <h2 className="title">@{user}</h2>
        <ol className="duties">
          {dutys.map((duty, index) => (
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
              <FontAwesomeIcon icon={faTrash} onClick={() => { deleteIndex.current = index; toggleModal() }} />
            </li>
          ))}
        </ol>
      </Card>

      <div className={`modal ${modalOpen ? "shown" : ""}`}>
        <div className="modalCard">
          <h2 className="center">Czy napewno chcesz usunąć:</h2>
          <h3 className="center">{dutys[deleteIndex.current]?.title}</h3>
          <div className="rowContainer">
            <button className="border red" onClick={toggleModal}>
              Anuluj
            </button>
            <button className="danger" onClick={() => deleteDutie(deleteIndex.current)}>
              Usuń
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
