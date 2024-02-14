interface calendarDeleteReqBody {
    calendar_event_id: string | number
}

type calendarDeleteResponse = {
    id: number;
    profile_id: number;
    house_id: number;
    title: string;
    start: string;
    end: string;
    color: string;
    createdAt: string;
} | ErrorRespone

type calendarGetResponse = {
    id: number;
    title: string;
    start: string;
    end: string;
    color: string;
}[] | ErrorRespone

interface calendarPostReqBody {
    user_house_id: number | string
    title: string
    start: string
    end: string
    color: string
}

type calendarPostResponse = {
    id: number;
    house_id: number;
    title: string;
    start: string;
    end: string;
    color: string;
} | ErrorRespone