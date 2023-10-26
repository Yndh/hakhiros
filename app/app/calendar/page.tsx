"use client"

import { AppLayout } from "@/app/components/appLayout"
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function CalendarPage() {
    return(
        <AppLayout active="calendar">
          <FullCalendar
            plugins={[
              dayGridPlugin,
            ]}
            locale = 'pl'
          />
        </AppLayout>
    )
}