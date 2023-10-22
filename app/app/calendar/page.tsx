"use client";

import { AppLayout } from "@/app/components/appLayout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo } from "react";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const events = [
    {
      title: "Event 1",
      start: new Date(2023, 9, 27, 8, 0),
      end: new Date(2023, 9, 27, 14, 48),
      allDay: false,
    },
    {
      title: "Grupowe sranie",
      start: new Date(2023, 9, 24, 21, 0),
      end: new Date(2023, 9, 24, 22, 30),
      allDay: false,
    },
  ];

  return (
    <AppLayout active="calendar">
      <div className="header">
        <div className="tile third transparent">
          <h1>Kalendarz</h1>
        </div>
      </div>
      <div className="tile third">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={defaultDate}
          defaultView="week"
        />
      </div>
    </AppLayout>
  );
}
