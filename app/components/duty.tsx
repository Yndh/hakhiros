"use client";

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface DutyProps {
  user: string;
  duties: Duty[];
  weekDay: number;
}

interface Duty {
  title: string;
  isCompleted: boolean;
}

export default function Duty({ user, duties, date }: DutyProps) {
  const [dutyList, setDutyList] = useState(duties);
  const handleCheckboxChange = (index: number) => {
    const updatedDutyList = [...dutyList];
    updatedDutyList[index].isCompleted = !updatedDutyList[index].isCompleted;
    setDutyList(updatedDutyList);

    console.table(dutyList);
  };
  return (
    <div className="card">
      <h2 className="title">@{user}</h2>
      <ol className="duties">
        {dutyList.map((duty, index) => (
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
          </li>
        ))}
        <li className="addDuty">
          <FontAwesomeIcon icon={faAdd} />
          <span>Dodaj</span>
        </li>
      </ol>
    </div>
  );
}
