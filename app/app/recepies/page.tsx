"use client";

import { AppLayout } from "@/app/components/appLayout";
import DropDown from "@/app/components/dropdown";
import recepies from "@/public/recepies.json";
import {
  faClock,
  faClose,
  faExclamation,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Recepie {
  tytul: string;
  krotki_opis: string;
  dlugi_opis: string;
  skladniki: {
    nazwa: string;
    ilosc: string;
  }[];
  kroki_przygotowania: string[];
  czas_przygotowania: string;
  poziom_trudnosci: string;
  kategorie: string[];
}

export default function Recepies() {
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecepie, setSelectedRecepie] = useState<Recepie>();
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

  const categories: string[] = ["Wszystkie", ...Object.keys(categoryCounts)]; // Add "All" to the categories array

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredRecepies = recepies.filter((recepie: Recepie) => {
    const lowercaseSearchValue = searchValue.toLowerCase(); // Konwertujemy searchValue na małe litery

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
              <li>Po tytule</li>
              <li>Po Trudności</li>
              <li>Po czasie wykonania</li>
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
          <div
            className="card recepieEl"
            key={index}
            onClick={(e) => {
              toggleModal(e);
              changeSelectedRecepie(recepie);
            }}
          >
            <h2 className="title">{recepie.tytul}</h2>
            <p className="desc">{recepie.krotki_opis}</p>
            <div className="rowContainer">
              <div>
                <FontAwesomeIcon icon={faExclamation} />
                {recepie.poziom_trudnosci}
              </div>
              <div>
                <FontAwesomeIcon icon={faClock} />
                {recepie.czas_przygotowania}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`modal ${modalOpen ? "shown" : ""}`}>
        <div className="modalCard">
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
          <ul>
            {selectedRecepie?.kroki_przygotowania.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
