"use client";

import { AppLayout } from "@/app/components/appLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAdd,
  faFilter,
  faThumbTack,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import Note from "@/app/components/note";
import { useState } from "react";

export default function Notes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectOpen, setIsSelectOpen] = useState(false);
  const [colorValue, setColorValue] = useState("#FFF9DB");
  const [notes, setNotes] = useState([
    {
      title: "Hakhiros apka wtf",
      description: "aplkacja hakhiros czyli centrum domowe",
      color: "#fff",
      isPinned: true,
    },
    {
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis magna vitae tempor convallis. Nam consectetur, risus id tincidunt tempus, risus enim ornare elit, vitae ullamcorper lorem tellus quis metus. Praesent at dolor risus. Sed eu cursus nisl, ac maximus enim. Suspendisse quis sagittis tellus. Vivamus vel eros hendrerit, vulputate enim vel, luctus nulla. Vivamus porta ex ligula, at porta ex aliquet ut.",
      color: "#fff",
      isPinned: false,
    },
    {
      title: "Notatka",
      description: "Test123",
      color: "#fff",
      isPinned: false,
    },
  ]);

  const colors = ["#fff", "#FFF9DB", "#E5FFDB", "#FFC0C0", "#E5CBFF"];

  const sortedNotes = [...notes].sort((a, b) => (b.isPinned ? 1 : -1));

  const toggleDropdown = () => {
    setIsSelectOpen(!selectOpen);
  };

  const handleOptionChange = (val: string) => {
    setColorValue(val);
    setIsSelectOpen(false);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const setTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setNoteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const addNote = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      const newNote = {
        title: title,
        description: content,
        color: colorValue,
        isPinned: false,
      };

      setNotes([...notes, newNote]);

      setTitle("");
      setContent("");
      toggleModal();
    }
  };

  return (
    <AppLayout active="notes">
      <div className="header">
        <h1>Notatki</h1>
        <div className="row">
          <button className="box">
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button onClick={toggleModal}>Utwórz</button>
          <label className="searchBar" htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Szukaj..." id="search" />
          </label>
        </div>
      </div>

      <div className="cardRow">
        {sortedNotes.map((note) => (
          <Note
            title={note.title}
            description={note.description}
            color={note.color}
            isPinned={note.isPinned}
          />
        ))}
      </div>

      <div className={`modal ${modalOpen ? "shown" : ""}`}>
        <div className="modalCard">
          <FontAwesomeIcon
            icon={faClose}
            className="close"
            onClick={toggleModal}
          />
          <h2 className="title">Utwórz notatke</h2>
          <div className="card newNote" style={{ background: colorValue }}>
            <h3 className="title">
              <input
                type="text"
                placeholder="Tytuł"
                value={title}
                onChange={setTitleValue}
              />
            </h3>
            <textarea
              placeholder="Wpisz notatkę..."
              value={content}
              onChange={setNoteContent}
            />
          </div>
          <div className="rowContainer">
            <div className="modalOption">
              <p>Kolor</p>
              <div
                className={`colorContainer ${selectOpen ? "open" : ""}`}
                onClick={toggleDropdown}
                style={{ background: colorValue }}
              >
                <div className="colorSelectAbsolute">
                  <ul className="select-items">
                    {colors.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleOptionChange(option)}
                      >
                        <span
                          className="colorSelectValue"
                          style={{ background: option }}
                        ></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <button className="modalOption">
              <p>Lista</p>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
          <button onClick={addNote}>Utwórz</button>
        </div>
      </div>
    </AppLayout>
  );
}
