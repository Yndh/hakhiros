import "../globals.css";
import { AppLayout } from "../components/appLayout";

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
        <div className="card">
          <h2 className="title">Twoje Obowiązki</h2>
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
        <div className="card">
          <h2 className="title">Notatka</h2>
          <span>Test123</span>
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

      {/* <div className="tile first">
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
      </div> */}
    </AppLayout>
  );
}
