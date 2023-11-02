interface Houses { [key: string]: string }

interface Note {
    id: number
    title: string
    description: string,
    color: string,
    createdAt: Date
    isPinned: boolean
}

interface NoteFetch {
    id: number
    title: string
    description: string,
    color: string,
    createdAt: string
    isPinned: boolean
}

interface EventCalender {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    color: string;
}

interface EventList {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    color: string;
}