"use client";

import { AppLayout } from "@/app/components/appLayout";
import recepies from "@/public/recepies.json";
import { useState } from "react";

interface Recipe {
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
  const categoryCounts: { [key: string]: number } = {};

  recepies.forEach((recipe: Recipe) => {
    recipe.kategorie.forEach((category) => {
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

  console.table(categoryCounts);

  return (
    <AppLayout active="recepies">
      <div className="header">
        <h1>Przepisy</h1>
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
            </li>
          ))}
        </ul>
      </div>

      <div className="cardRow recepies">
        <div className="card">
          <h2 className="title">Asdas</h2>
          <p className="thin">Opis</p>
        </div>
      </div>
    </AppLayout>
  );
}
