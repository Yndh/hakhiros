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
import { useEffect, useRef, useState } from "react";
import DropDown from "@/app/components/dropdown";
import Modal from "@/app/components/modal";
import Card from "@/app/components/card";
import { toast } from "react-toastify";
import useUserHouseId from "@/store/useUserHouseId";

export default function Notes() {
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const [selectOpen, setIsSelectOpen] = useState(false);
  const [colorValue, setColorValue] = useState("#FFF9DB");
  const [noteSort, setNoteSort] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const colors = ["#fff", "#FFF9DB", "#E5FFDB", "#FFC0C0", "#E5CBFF"];

  const user_house_id = useUserHouseId()
  useEffect(() => {
    if (user_house_id == "" || user_house_id == "-1") {
      return
    }
    fetch(`/api/note?user_house_id=${user_house_id}`)
      .then((res) => res.json())
      .then((data: NoteFetch[]) => {
        if ("error" in data) {
          toast.error(`Wystąpił błąd: ${data["error"]}`);
          return;
        }
        const datetime_data = data.map((note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        }));
        setNotes(datetime_data);
      });
  }, [user_house_id]);

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

  const addNote = async () => {
    if (title.current?.value.trim() === "" && content.current?.value.trim() === "") {
      toast.error("Wypełnij wszystkie pola")
      return;
    }
    const newNote = {
      title: title.current?.value || "",
      description: content.current?.value || "",
      color: colorValue,
      user_house_id: user_house_id,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(newNote),
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
      toast.error(`Wystąpił błąd: ${note.error}`);
      return;
    }
    setNotes((notes) => [...notes, note]);
    if (title.current) title.current.value = ""
    if (content.current) content.current.value = ""
    toggleModal();

    toast.success("Notatka została utworzona")
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
    <AppLayout active="notes" setTriggerRerender={setTriggerRerender}>
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
        {getSortedNotes().map((note, index) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
            color={note.color}
            isPinned={note.isPinned}
            setNotes={setNotes}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen}>
        <FontAwesomeIcon
          icon={faClose}
          className="close"
          onClick={toggleModal}
        />
        <h2 className="title">Utwórz notatke</h2>
        <Card classes="newNote" color={colorValue}>
          <h3 className="title">
            <input
              type="text"
              placeholder="Tytuł"
              ref={title}
              className="noteInput"
            />
          </h3>
          <textarea
            placeholder="Wpisz notatkę..."
            ref={content}
          />
        </Card>
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
                    <li key={index} onClick={() => handleOptionChange(option)}>
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
        </div>
        <button onClick={addNote}>Utwórz</button>
      </Modal>
    </AppLayout>
  );
}
