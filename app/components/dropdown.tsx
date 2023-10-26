import { useState } from "react";

interface DropDownProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function DropDown({ children, isOpen }: DropDownProps) {

  return (
    <div className={`selectAbsolute ${isOpen ? "open" : ""}`}>
      <div className="selectContainer">
        <ul>
          {children}
        </ul>
      </div>
    </div>
  );
}
