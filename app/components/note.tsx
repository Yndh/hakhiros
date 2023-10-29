"use client";

import { faThumbTack, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface NoteProps {
  isPinned: boolean;
  title: string;
  description: string;
  color: string;
}

export default function Note({
  isPinned,
  title,
  description,
  color,
}: NoteProps) {
  const [pinned, setPinned] = useState(isPinned);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = (e: React.MouseEvent<any, MouseEvent>) => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className="card" style={{ background: color }}>
        <h2 className="title">{title}</h2>
        <FontAwesomeIcon
          icon={faThumbTack}
          className={`pin ${pinned ? "pinned" : ""}`}
          onClick={(e) => {
            setPinned(!pinned);
          }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="delete"
          onClick={toggleModal}
        />
        <span>{description}</span>
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
