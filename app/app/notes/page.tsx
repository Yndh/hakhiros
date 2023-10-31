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
import DropDown from "@/app/components/dropdown";
import { relative } from "path";

export default function Notes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectOpen, setIsSelectOpen] = useState(false);
  const [colorValue, setColorValue] = useState("#FFF9DB");
  const [noteSort, setNoteSort] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [notes, setNotes] = useState([
    {
      title: "Hakhiros apka wtf",
      description: "aplkacja hakhiros czyli centrum domowe",
      color: "#fff",
      createdAt: new Date("10/25/2023 13:11:53"),
      isPinned: true,
    },
    {
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis magna vitae tempor convallis. Nam consectetur, risus id tincidunt tempus, risus enim ornare elit, vitae ullamcorper lorem tellus quis metus. Praesent at dolor risus. Sed eu cursus nisl, ac maximus enim. Suspendisse quis sagittis tellus. Vivamus vel eros hendrerit, vulputate enim vel, luctus nulla. Vivamus porta ex ligula, at porta ex aliquet ut.",
      color: "#fff",
      createdAt: new Date("10/25/2023 12:54:00"),
      isPinned: false,
    },
    {
      title: "Notatka",
      description:
        "SEKSOOOOOO SEKSOOOOOO SEKSOOOOOOSEKSOOOOOOSEKSOOOOOOSEKSOOOOOOSEKSOOOOOOSEKSOOOOOOSEKSOOOOOOSEKSOOOOOOSEKSOOOOOOSEKSOOOOOOSEKSOOOOOO",
      color: "#fff",
      createdAt: new Date("10/25/2023 13:21:00"),
      isPinned: false,
    },
  ]);

  const colors = ["#fff", "#FFF9DB", "#E5FFDB", "#FFC0C0", "#E5CBFF"];

  const getSortedNotes = () => {
    const filteredNotes = searchNotes();
    const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
    const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

    let sortedUnpinnedNotes = [];

    switch (noteSort) {
      case "title":
        sortedUnpinnedNotes = unpinnedNotes.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "date":
        sortedUnpinnedNotes = unpinnedNotes.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
      default:
        sortedUnpinnedNotes = [...unpinnedNotes];
    }

    return [...pinnedNotes, ...sortedUnpinnedNotes];
  };

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
        createdAt: new Date(),
      };

      setNotes([...notes, newNote]);

      setTitle("");
      setContent("");
      toggleModal();
    }
  };

  const filterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterChange = (val: string) => {
    setNoteSort(val);
    setFilterOpen(false);
  };

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchNotes = () => {
    return notes.filter((note) => {
      const titleMatch = note.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const contentMatch = note.description
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return titleMatch || contentMatch;
    });
  };

  return (
    <AppLayout active="notes">
      <div className="header">
        <h1>Notatki</h1>
        <div className="row">
          <div style={{ position: "relative" }}>
            <button className="box" onClick={filterToggle}>
              <FontAwesomeIcon icon={faFilter} />
            </button>
            <DropDown isOpen={filterOpen}>
              <li
                onClick={() => handleFilterChange("title")}
                className={noteSort == "title" ? "active" : ""}
              >
                Po tytule
              </li>
              <li
                onClick={() => handleFilterChange("date")}
                className={noteSort == "date" ? "active" : ""}
              >
                Od najnowszych
              </li>
            </DropDown>
          </div>
          <button onClick={toggleModal}>Utwórz</button>
          <label className="searchBar" htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Szukaj..."
              className="noteInput"
              id="search"
              value={searchValue}
              onChange={searchHandle}
            />
          </label>
        </div>
      </div>

      <div className="cardRow">
        {getSortedNotes().map((note) => (
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
                className="noteInput"
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
