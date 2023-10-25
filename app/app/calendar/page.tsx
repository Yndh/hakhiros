"use client"

import { AppLayout } from "@/app/components/appLayout"
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Duties() {
    return(
        <AppLayout active="duties">
        <FullCalendar
          plugins={[
            dayGridPlugin,
          ]}
        />
        </AppLayout>
    )
}