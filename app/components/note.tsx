"use client";

import { faThumbTack, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import Modal from "./modal";
import Card from "./card";

interface NoteProps {
  id: number;
  isPinned: boolean;
  title: string;
  description: string;
  color?: string;
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export default function Note({
  id,
  isPinned,
  title,
  description,
  color,
  setNotes,
}: NoteProps) {
  const [pinned, setPinned] = useState(isPinned);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = (e: React.MouseEvent<any, MouseEvent>) => {
    setModalOpen(!modalOpen);
  };

  const deleteNode = async (e: React.MouseEvent<any, MouseEvent>) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify({ note_id: id }),
    };
    const note = await fetch("/api/note", options)
      .then((res) => res.json())
      .then((data: NoteFetch) => {
        const datetime_node: Note = {
          ...data,
          createdAt: new Date(data["createdAt"]),
        };
        return datetime_node;
      });
    if ("error" in note) {
      console.log(note.error);
      return;
    }
    setNotes((note) => note.filter((note) => note.id !== id));
    toggleModal(e);
  };

  const pinNote = async (e: React.MouseEvent<any, MouseEvent>) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ note_id: id }),
    };
    const note = await fetch("/api/note", options)
      .then((res) => res.json())
      .then((data: NoteFetch) => {
        return data;
      });
    setPinned(note.isPinned);
  };

  return (
    <>
      <Card color={color}>
        <h2 className="title">{title}</h2>
        <FontAwesomeIcon
          icon={faThumbTack}
          className={`pin ${pinned ? "pinned" : ""}`}
          onClick={pinNote}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="delete"
          onClick={toggleModal}
        />
        <span className="noteDesc">{description}</span>
      </Card>

      <Modal isOpen={modalOpen}>
        <h2 className="center">Czy napewno chcesz usunąć ten element</h2>
        <div className="rowContainer">
          <button className="border red" onClick={toggleModal}>
            Anuluj
          </button>
          <button className="danger" onClick={deleteNode}>
            Usuń
          </button>
        </div>
      </Modal>
    </>
  );
}
