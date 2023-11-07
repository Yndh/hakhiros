"use client"

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface Expandable{
    index: number,
    title: string,
    content: string
}

export default function Expandable({ index, title, content } : Expandable){
    const [isExpanded, setIsExpanded] = useState(false)

    const expandHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsExpanded(!isExpanded)
    }

    return(
        <div className="expandable" onClick={expandHandler}>
            <div className="expandableHeader">
            
                <h2>
                <span>Q{index}</span>
                <span> {title}</span>
                </h2>
                <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} />
            </div>
            <div className={`expandableContent ${isExpanded ? "active" : ""}`}>
                <p>{content}</p> 
            </div>
        </div>
    )
}