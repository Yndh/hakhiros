import "../globals.css";
import { AppLayout } from "../components/appLayout";
import Note from "../components/note";
import Duty from "../components/duty";

export default function Dashboard() {
  return (
    <AppLayout active="dashboard">
      <div className="header">
        <div className="collumn">
          <span>Witaj Ponownie,</span>
          <h1>Użytkownik</h1>
        </div>
      </div>

      <div className="cardRow dashboard">
        <div className="cardRow two">
          <Duty
            id={1}
            user={"Użytkownik"}
            duties={[
              {
                title: "spotkanie",
                isCompleted: false,
              },
              {
                title: "zakupy",
                isCompleted: true,
              },
            ]}
            weekDay={5}
          />

          <Note
            isPinned={true}
            title={"Tytuł"}
            description={"To jest przykladowa notatka"}
          />
        </div>
        <div className="card online">
          <h2 className="title">Online</h2>
          <div className="avatarRow">
            <img src="Avatar.svg" alt="Avatar" className="profilePhoto" />
            <img src="Avatar.svg" alt="Avatar" className="profilePhoto" />
            <img src="Avatar.svg" alt="Avatar" className="profilePhoto" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
