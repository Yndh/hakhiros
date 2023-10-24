"use client"

import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface NoteProps {
    isPinned: boolean;
    title: string;
    description: string;
}


export default function Note({ isPinned, title, description }: NoteProps) {
    const [pinned, setPinned] = useState(isPinned);

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <FontAwesomeIcon icon={faThumbTack} className={`pin ${pinned ? "pinned" : ""}`} onClick={(e) => {setPinned(!pinned)}}/>
      <span>{description}</span>
    </div>
  );
}
