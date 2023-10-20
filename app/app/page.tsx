import "../globals.css";
import { NavBar } from "../components/navbar";
import { AppLayout } from "../components/appLayout";

export default function Dashboard() {
  return (
    <AppLayout active="dashboard">
      <div className="tile first transparent">
        <span>Witaj Ponownie,</span>
        <h1>Użytkownik</h1>
      </div>
      <div className="tile first">
        <p className="title">Twoje obowiązki</p>
        <ol className="duties">
          <li>
            <label htmlFor="check1">
              <input type="checkbox" id="check1" />
              <span>Zrobić zakupy</span>
            </label>
          </li>
          <li>
            <label htmlFor="check2">
              <input type="checkbox" id="check2" />
              <span>Posprzątać dom</span>
            </label>
          </li>
          <li>
            <label htmlFor="check3">
              <input type="checkbox" id="check3" />
              <span>Umyć kibel</span>
            </label>
          </li>
        </ol>
      </div>
      <div className="tile first">
        <p className="title">Tile 2</p>
      </div>
    </AppLayout>
  );
}
