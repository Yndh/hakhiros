"use client";

import { AppLayout } from "@/app/components/appLayout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const events = [
    {
      title: "Event 1",
      start: new Date(2023, 9, 17, 8, 0),
      end: new Date(2023, 9, 17, 14, 48),
      allDay: false,
    },
    {
      title: "Grupowe sranie",
      start: new Date(2023, 9, 21, 21, 0),
      end: new Date(2023, 9, 21, 22, 30),
      allDay: false,
    },
  ];

  return (
    <AppLayout active="calendar">
      <h1>Kalendarz</h1>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        style={{ height: "92%" }}
        events={events}
        toolbar={true}
      />
    </AppLayout>
  );
}
