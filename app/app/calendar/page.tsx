"use client";

import { AppLayout } from "@/app/components/appLayout";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'; 
import "./style.css"

export default function CalendarPage() {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState([{}])
  const [eventTitle, setEventTitle] = useState("")
  const [eventList, setEventList] = useState({title: eventTitle,
    start: "10.10.2023",
    end: "11.10.2023",
    display: 'background',})

  const createEvent = (e) =>{
    e.preventDefault()
    const newEvent ={
      title: eventTitle,
      start: selectedDate[0].toLocaleString(),
      end: selectedDate[1].toLocaleString(),
      display: 'background',
    }
    setEventList(newEvent)
    console.log(eventList)
  }

  return(
      <AppLayout active="calendar">
        <div className="calendarBox">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
            ]}
            events={eventList}
            dateClick={()=> setOpen(!open)}
            locale = 'pl'
            selectable = {true}
            select={(info) => setSelectedDate([info.startStr.valueOf, info.endStr.valueOf])}
          />
          {open &&(
            <div className="addEventContainer">
              <div className="addEventBox">
                <form className="editEvent">
                  <label>Title</label>
                  <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/>
                  <label>Data Początkowa</label>
                  <input 
                    type="date" 
                    value={selectedDate[0] && selectedDate[0].toLocaleString()}
                    onChange={(e) => setSelectedDate([(e.target.value),selectedDate[1]])}
                  />
                  <label>Data Końcowa</label>
                  <input 
                    type="date" 
                    value={selectedDate[1] && selectedDate[1].toLocaleString()}
                    onChange={(e) => setSelectedDate([selectedDate[0], (e.target.value)])}
                  />
                  <button onClick={(e) => createEvent(e)}/>
                </form>
                <p className="exitEvent" onClick={()=> setOpen(!open)}>x</p>
              </div>
            </div>
          )}
        </div>
      </AppLayout>
  )
}

