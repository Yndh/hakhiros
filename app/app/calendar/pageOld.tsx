"use client";

import { AppLayout } from "@/app/components/appLayout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import { useMemo } from "react";

moment.locale("en-GB");

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
        <h2>Kalendarz</h2>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"

        defaultView="week"
        toolbar={true}
      />
    </AppLayout>
  );
}
