interface House {name:string, code:string}
interface Houses { [key: string]:House  }

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

interface Member {
    name: string,
    display_name: string | null,
    is_owner: boolean
}
interface Members { [key: string | number]: Member }
interface ErrorRespone { "error": string }

interface DutieFetch {
    id: number,
    title: string,
    profile_id: number
    is_done: boolean,
    week_day: number
}

interface Dutie {
    id: number,
    user: string,
    duties: {
        title: string,
        isCompleted: boolean
    }[]
    profile_id: number,
    weekDay: number
}