import React from "react";
import Expandable from "./expandableDiv";

const faqData = [
  {
    question: "Czym są 'Domy'?",
    answer:
      "'Domy' w FamiLynk to grupy lub przestrzenie organizacyjne, które pozwalają na wspólne zarządzanie życiem rodzinym. Możesz utworzyć swój własny 'Dom' dla swojej rodziny lub dołączyć do istniejącego, aby wspólnie planować, organizować i zarządzać obowiązkami oraz wydarzeniami. Domy pozwalają na spersonalizowanie aplikacji pod potrzeby różnych grup rodzinnych.",
    },
    {
      question:
      "Czy FamiLynk jest dostępny na różne platformy, takie jak Android i iOS?",
      answer:
        "Tak, FamiLynk to aplikacja webowa, dostępna na różnych przeglądarkach internetowych, co oznacza, że możesz z niej korzystać zarówno na komputerze, jak i na urządzeniach mobilnych. Co najlepsze, FamiLynk jest dostępny w pełni za darmo, bez ukrytych opłat.",
    },
  {
    question: "Jak mogę zacząć korzystać z aplikacji FamiLynk?",
    answer:
      "Aby rozpocząć korzystanie z FamiLynk, wystarczy zarejestrować swoje konto, a następnie utworzyć 'Dom' lub dołączyć do istniejącego, gdzie będziesz mógł zarządzać życiem rodzinny wraz z innymi członkami.",
    },
  {
    question:
      "Jak mogę zaprosić innych członków mojej rodziny do korzystania z aplikacji?",
    answer:
      "Możesz zaprosić innych członków rodziny, udostępniając im link do dołączenia do 'Domu' lub podać im kod.",
  },
  {
    question:
      "Jakie rodzaje obowiązków i wydarzeń można dodawać do kalendarza?",
    answer:
      "Możesz dodawać różne rodzaje obowiązków i wydarzeń, takie jak spotkania, urodziny, zadania domowe, wyjścia i wiele innych. Nasza aplikacja pozwala na spersonalizowanie kalendarza według własnych potrzeb.",
  },
];

export default function FAQ() {
  return (
    <div className="faqColumn">
      {faqData.map((item, index) => (
        <Expandable key={index} index={index+1} title={item.question} content={item.answer} />
      ))}
    </div>
  );
}
