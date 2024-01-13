"use client";

import { AppLayout } from "@/app/components/appLayout";
import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Modal from "@/app/components/modal";
import { toast } from "react-toastify";
import useUserHouseId from "@/store/useUserHouseId";

export default function CalendarPage() {
  const [triggerRerender, setTriggerRerender] = useState(false);
  //Popupy wszystkie
  const [selectOpen, setIsSelectOpen] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  //tu mamy naszą liste eventów
  const [eventsList, setEventsList] = useState<EventList[]>([]);

  //tu są do zarządzanie eventem
  const [eventTitle, setEventTitle] = useState("");
  const [eventChoosed, setEventChoosed] = useState<any>({});
  const [colorValue, setColorValue] = useState("#FFF9DB");

  const house_id = useUserHouseId()
  useEffect(() => {
    fetch(`/api/calendar?user_house_id=${house_id}`)
      .then((res) => res.json())
      .then((data: EventList[]) => {
        if ("error" in data) {
          toast.error(`Wystąpił błąd: ${data["error"]}`);
          return
        }
        const event_data = data.map((event) => ({
          ...event,
        }));
        setEventsList(event_data);
      });
  }, [house_id]);

  const setDate = (info: any) => {
    setSelectedStartDate(info.startStr);
    setSelectedEndDate(info.endStr);
  };

  //tworzenie eventu
  const createEvent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpenAdd(!openAdd);

    //tu tworzymy nowy event
    const newEvent = {
      user_house_id: house_id,
      title: eventTitle,
      start: selectedStartDate,
      end: selectedEndDate,
      color: colorValue,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(newEvent),
    };
    const event = await fetch("/api/calendar", options).then((res) =>
      res.json()
    );
    if ("error" in event) {

      toast.error(`Wystąpił błąd: ${event.error}`);
      return;
    }

    //tu ustawiamy liste eventuw na liste z nawym elementem
    setEventsList([...eventsList, event]);
    setEventTitle("");
    //console.log(eventsList);

    toast.success("Wydarzenie zostało utworzone");
  };

  //tu usuwamy event poprzez wyszukanie elementu w całej liście poprzez id i wyrzucenie go z listy, później poprostu wrzucamy cała liste bez eventu
  const deleteEvent = async () => {
    const options = {
      method: "DELETE",
      body: JSON.stringify({
        calendar_event_id: eventChoosed.el.fcSeg.eventRange.def.publicId,
      }),
    };

    await fetch("/api/calendar", options);
    const filteredEvents = eventsList.filter(
      (item) => item.id != eventChoosed.el.fcSeg.eventRange.def.publicId
    );
    setEventsList(filteredEvents);

    //console.log("========");
    //console.log(eventChoosed);
    toast.success("Wydarzenie zostało usuniętę");
  };

  const toggleDropdown = () => {
    setIsSelectOpen(!selectOpen);
  };

  const handleOptionChange = (val: string) => {
    setColorValue(val);
    setIsSelectOpen(false);
  };

  const colors = ["#FFF9DB", "#E5FFDB", "#FFC0C0", "#E5CBFF"];

  return (
    <AppLayout setTriggerRerender={setTriggerRerender} active="calendar">
      <div className="calendarBox">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          events={eventsList as any[]}
          dateClick={() => setOpenAdd(!openAdd)}
          locale="pl"
          selectable={true}
          select={(info) => setDate(info)}
          eventClick={(event) => {
            setEventChoosed(event);
            setOpenEdit(!openEdit);
          }}
          eventTextColor={"black"}
          longPressDelay={1}
          selectLongPressDelay={1}
        />
      </div>
      <Modal isOpen={openAdd}>
        <h2 className="title">Dodaj</h2>
        <label className="thin">Tytuł</label>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
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
                  <li key={index} onClick={() => handleOptionChange(option)}>
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
          onClick={() => {
            setOpenAdd(!openAdd);
            setEventTitle("");
          }}
        />
      </Modal>

      <Modal isOpen={openEdit}>
        <h2 className="center">Czy napewno chcesz usunąć wydarzenie</h2>
        <div className="rowContainer">
          <button
            className="border red"
            onClick={() => {
              setOpenEdit(!openEdit);
              setEventTitle("");
            }}
          >
            Anuluj
          </button>
          <button
            className="danger"
            onClick={() => {
              deleteEvent();
              setOpenEdit(!openEdit);
              setEventTitle("");
            }}
          >
            Usuń
          </button>
        </div>
      </Modal>
    </AppLayout>
  );
}
/*
  const editEvent = (event) => {
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

  const saveEditEvent = async (e) => {
    e.preventDefault();
    const filteredEvents = eventsList.filter(item => item.id != eventChoosed.el.fcSeg.eventRange.def.publicId);
    const selectedEvent = eventsList.filter(item => item.id == eventChoosed.el.fcSeg.eventRange.def.publicId);

    selectedEvent[0].title = eventTitle
    selectedEvent[0].start = selectedStartDate.toLocaleString()
    selectedEvent[0].end = selectedEndDate.toLocaleString()
    selectedEvent[0].allDay = true
    selectedEvent[0].color = colorValue

    const updatedEvents = [...filteredEvents, selectedEvent[0]];

    setEventsList(updatedEvents)
  }*/

/*
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
        <button onClick={() => {deleteEvent(); setOpenEdit(!openEdit); setEventTitle("")}}>usuń</button>
        <button onClick={(e) => {saveEditEvent(e); setOpenEdit(!openEdit); setEventTitle("")}}>edytuj</button>
        <FontAwesomeIcon
          icon={faClose}
          className="close"
          onClick={() => {setOpenEdit(!openEdit); setEventTitle("")}}
        />
    </div>
  </div>
)}*/
