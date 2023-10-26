"use client";

import { AppLayout } from "@/app/components/appLayout";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./style.css"

export default function CalendarPage() {
    return(
        <AppLayout active="calendar">
          <div className="calendarBox">
            <FullCalendar
              plugins={[
                dayGridPlugin,
              ]}
              locale = 'pl'
            />
          </div>
        </AppLayout>
    )
}

