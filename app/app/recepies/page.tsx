"use client";

import { AppLayout } from "@/app/components/appLayout";
import CardLoader from "@/app/components/cardLoader";
import DropDown from "@/app/components/dropdown";
import Modal from "@/app/components/modal";
import recepies from "@/public/recepies.json";
import {
  faClock,
  faClose,
  faExclamation,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, useState } from "react";

interface Recepie {
  tytul: string;
  krotki_opis: string;
  dlugi_opis: string;
  skladniki: {
    nazwa: string;
    ilosc: string;
  }[];
  kroki_przygotowania: string[];
  czas_przygotowania: {
    liczba: number;
    jednostka: string;
  };
  poziom_trudnosci: string;
  kategorie: string[];
}

export default function Recepies() {
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecepie, setSelectedRecepie] = useState<Recepie>();
  const [recepieSort, setRecepieSort] = useState("title");
  const categoryCounts: { [key: string]: number } = {};

  recepies.forEach((recepie: Recepie) => {
    recepie.kategorie.forEach((category) => {
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });

  const categories: string[] = ["Wszystkie", ...Object.keys(categoryCounts)];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredRecepies = recepies
    .filter((recepie: Recepie) => {
      const lowercaseSearchValue = searchValue.toLowerCase();

      if (
        selectedCategory === "Wszystkie" &&
        (recepie.tytul.toLowerCase().includes(lowercaseSearchValue) ||
          recepie.krotki_opis.toLowerCase().includes(lowercaseSearchValue))
      ) {
        return true;
      } else if (
        recepie.kategorie.includes(selectedCategory) &&
        (recepie.tytul.toLowerCase().includes(lowercaseSearchValue) ||
          recepie.krotki_opis.toLowerCase().includes(lowercaseSearchValue))
      ) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      if (recepieSort === "time") {
        const aTimeInMinutes =
          a.czas_przygotowania.jednostka === "h"
            ? a.czas_przygotowania.liczba * 60
            : a.czas_przygotowania.liczba;
        const bTimeInMinutes =
          b.czas_przygotowania.jednostka === "h"
            ? b.czas_przygotowania.liczba * 60
            : b.czas_przygotowania.liczba;

        return aTimeInMinutes - bTimeInMinutes;
      } else if (recepieSort === "title") {
        return a.tytul.localeCompare(b.tytul);
      } else if (recepieSort === "difficulty") {
        return a.poziom_trudnosci.localeCompare(b.poziom_trudnosci);
      } else {
        return a.tytul.localeCompare(b.tytul);
      }
    });

  console.table(categoryCounts);

  const filterToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFilterOpen(!filterOpen);
  };

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const toggleModal = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLOrSVGElement, MouseEvent>
  ) => {
    setModalOpen(!modalOpen);
  };

  const changeSelectedRecepie = (recepie: Recepie) => {
    setSelectedRecepie(recepie);
  };

  const handleFilterChange = (val: string) => {
    setRecepieSort(val);
    setFilterOpen(false);
  };

  return (
    <AppLayout active="recepies">
      <div className="header">
        <h1>Przepisy</h1>
        <div className="row">
          <div style={{ position: "relative" }}>
            <button className="box" onClick={filterToggle}>
              <FontAwesomeIcon icon={faFilter} />
            </button>
            <DropDown isOpen={filterOpen}>
              <li
                onClick={() => {
                  handleFilterChange("title");
                }}
                className={recepieSort == "title" ? "active" : ""}
              >
                Po tytule
              </li>
              <li
                onClick={() => {
                  handleFilterChange("difficulty");
                }}
                className={recepieSort == "difficulty" ? "active" : ""}
              >
                Po Trudności
              </li>
              <li
                onClick={() => {
                  handleFilterChange("time");
                }}
                className={recepieSort == "time" ? "active" : ""}
              >
                Po czasie wykonania
              </li>
            </DropDown>
          </div>
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

      <div className="categoryChoice">
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={selectedCategory === category ? "selected" : ""}
            >
              {category}
              {category !== "Wszystkie" ? ` (${categoryCounts[category]})` : ""}
            </li>
          ))}
        </ul>
      </div>

      <div className="cardRow recepies">
        {filteredRecepies.map((recepie: Recepie, index) => (
          <Suspense fallback={<CardLoader />}>
            <div
              className="card recepieEl"
              onClick={(e) => {
                toggleModal(e);
                changeSelectedRecepie(recepie);
              }}
            >
              <h2 className="title">{recepie.tytul}</h2>
              <p className="desc">{recepie.krotki_opis}</p>
              <div className="rowContainer">
                <div
                  className={`info ${
                    recepie.poziom_trudnosci == "Łatwy"
                      ? "easy"
                      : recepie.poziom_trudnosci === "Średni"
                      ? "medium"
                      : "hard"
                  }`}
                >
                  <FontAwesomeIcon icon={faExclamation} />
                  {recepie.poziom_trudnosci}
                </div>
                <div className="info time">
                  <FontAwesomeIcon icon={faClock} />
                  {`${recepie.czas_przygotowania.liczba} ${recepie.czas_przygotowania.jednostka}`}
                </div>
              </div>
            </div>
          </Suspense>
        ))}
      </div>

      <Modal isOpen={modalOpen}>
        <h2 className="title">{selectedRecepie?.tytul}</h2>
        <FontAwesomeIcon
          icon={faClose}
          className="close"
          onClick={toggleModal}
        />
        <p className="desc">{selectedRecepie?.dlugi_opis}</p>

        <p className="thin">Składniki</p>
        <ul>
          {selectedRecepie?.skladniki.map((item, index) => (
            <li key={index}>{item.nazwa}</li>
          ))}
        </ul>

        <p className="thin">Kroki</p>
        <ol>
          {selectedRecepie?.kroki_przygotowania.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>

        <button onClick={toggleModal}>Zamknij</button>
      </Modal>
    </AppLayout>
  );
}
