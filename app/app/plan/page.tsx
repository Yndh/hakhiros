import { AppLayout } from "@/app/components/appLayout"
import "./style.css";

const date = new Date()
const day = date.getDay()
const days = ["poniedziałek","wtorek","środa","czwartek","piatek","sobota","niedziela"]

export default function Plan() {
    const user = ["maciek"];
    const events = [{text:"aaa", startTime:"8:00",endTime:"9:00"}]

    const hours = Array.from({ length: 25 }, (_, index) => index);

    return (
        <AppLayout active="plan">
            <div className="main">
                <div className="head">
                    <h1>{days[day]}</h1>
                </div>
                <div className="content">
                    {user.map((user) => 
                        <ul className="user">
                            {events.map((event) =>
                                <li className="userEvent">{event.text}</li>
                            )}
                        </ul>
                    )}
                    {hours.map((hour) => (
                        <div className="hour-line" key={hour}>
                            <div className="hour-label">{hour.toString().padStart(2, '0')}:00</div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

