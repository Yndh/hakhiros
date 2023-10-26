"use client";

import { AppLayout } from "@/app/components/appLayout";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  return (
    <AppLayout active="calendar">
      <FullCalendar plugins={[dayGridPlugin]} />
    </AppLayout>
  );
}
