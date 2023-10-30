"use client";

import { AppLayout } from "@/app/components/appLayout";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

export default function CalendarPage() {
  const [selectOpen, setIsSelectOpen] = useState(false);
  const [openColor, setOpenColor] = useState(false)
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [eventChoosed, setEventChoosed] = useState({})
  const [colorValue, setColorValue] = useState("#FFF9DB");


  const setDate = (info) => {
    setSelectedStartDate(info.startStr);
    setSelectedEndDate(info.endStr);
  };

  const createEvent = (e) => {
    e.preventDefault();
    setOpenAdd(!openAdd);

    const newEvent = {
      id: Math.random(),
      title: eventTitle,
      start: selectedStartDate.toLocaleString(),
      end: selectedEndDate.toLocaleString(),
      allDay: true,
      color: colorValue,
    }

    setEventTitle("");

    const updatedEventsList = [...eventsList, newEvent];
    setEventsList(updatedEventsList);
  };

  const editEvent = (event) => {
    //console.log(event)
    const startDate = event.el.fcSeg.eventRange.range.start;
    const startDateStr = `${startDate.getFullYear()}-${String(
      startDate.getMonth() + 1
    ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
    const endDate = event.el.fcSeg.eventRange.range.end;
    const endDateStr = `${endDate.getFullYear()}-${String(
      endDate.getMonth() + 1
    ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

    setEventTitle(event.el.fcSeg.eventRange.def.title);
    setSelectedStartDate(startDateStr);
    setSelectedEndDate(endDateStr);
  };

  const saveEditEvent = () => {
    const filteredEvents = eventsList.filter(item => item.id != eventChoosed.el.fcSeg.eventRange.def.publicId);
    const selectedEvent = eventsList.filter(item => item.id == eventChoosed.el.fcSeg.eventRange.def.publicId);

    selectedEvent[0].title = eventTitle
    selectedEvent[0].start = selectedStartDate.toLocaleString()
    selectedEvent[0].end = selectedEndDate.toLocaleString()
    selectedEvent[0].allDay = true
    selectedEvent[0].color = colorValue

    const updatedEvents = [...filteredEvents, selectedEvent[0]];

    setEventsList(updatedEvents)
  }

  const deleteEvent = () =>{
    const filteredEvents = eventsList.filter(item => item.id != eventChoosed.el.fcSeg.eventRange.def.publicId);
    setEventsList(filteredEvents)
  }

  const toggleDropdown = () => {
    setIsSelectOpen(!selectOpen);
  };

  const handleOptionChange = (val: string) => {
    setColorValue(val);
    setIsSelectOpen(false);
  };

  const colors = ["#fff", "#FFF9DB", "#E5FFDB", "#FFC0C0", "#E5CBFF"];

  return(
      <AppLayout active="calendar">
        <div className="calendarBox">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
            ]}
            events={eventsList}
            dateClick={()=> setOpenAdd(!openAdd)}
            locale = 'pl'
            selectable = {true}
            select={(info) => setDate(info)}
            eventClick={(event) => {editEvent(event); setOpenEdit(!openEdit); setEventChoosed(event)}}
            eventTextColor ={"black"}
          />
        </div>
        {openAdd &&(
            <div className="modal shown">
              <div className="modalCard">
                  <h2 className="title">Dodaj</h2>
                  <label className="thin">tytuł</label>
                  <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/>
                  <label className="thin">Data Początkowa</label>
                  <input 
                    type="date" 
                    value={selectedStartDate || ""}
                    onChange={(e) => setSelectedStartDate(e.target.value)}
                  />
                  <label className="thin">Data Końcowa</label>
                  <input 
                    type="date" 
                    value={selectedEndDate || ""}
                    onChange={(e) => setSelectedEndDate(e.target.value)}
                  />
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
                  <button onClick={(e) => createEvent(e)}>Dodaj</button>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="close"
                    onClick={() => {setOpenAdd(!openAdd); setEventTitle("")}}
                  />
              </div>
            </div>
          )}
          {openEdit &&(
            <div className="modal shown">
              <div className="modalCard">
                  <h2 className="title">Edytuj</h2>
                  <label className="thin">tytuł</label>
                  <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/>
                  <label className="thin">Data Początkowa</label>
                  <input 
                    type="date" 
                    value={selectedStartDate || ""}
                    onChange={(e) => setSelectedStartDate(e.target.value)}
                  />
                  <label className="thin">Data Końcowa</label>
                  <input 
                    type="date" 
                    value={selectedEndDate || ""}
                    onChange={(e) => setSelectedEndDate(e.target.value)}
                  />
                  <button onClick={() => {deleteEvent(); setOpenEdit(!openEdit); setEventTitle("")}}>usuń</button>
                  <button onClick={() => {saveEditEvent(); setOpenEdit(!openEdit); setEventTitle("")}}>edytuj</button>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="close"
                    onClick={() => {setOpenEdit(!openEdit); setEventTitle("")}}
                  />
              </div>
            </div>
          )}
      </AppLayout>
  )
}
