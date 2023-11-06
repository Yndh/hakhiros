import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./landing.css";
import {
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AppFunctions from "./components/appFunctions";

export default function Home() {
  return (
    <main className="landingContainer">
      <header className="landingHeader">
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
          <p>FamiLynk</p>
        </div>
        <ul className="landingNav">
          <li>
            <a href="">Lorem</a>
          </li>
          <li>
            <a href="/#about">O nas</a>
          </li>
          <li>
            <a href="/#functions">Funkcje</a>
          </li>
          <li>
            <a href="">Ipsum</a>
          </li>
          <li>
            <a href="/app">
              <button>Zaloguj sie</button>
            </a>
          </li>
        </ul>
      </header>

      <div className="heroContainer">
        <h1>Twoje rodzinne centrum organizacji</h1>
        <img src="/houseBaner.svg" alt="" />
        {/* <a href="/app"><button>FamiLynk</button></a> */}
      </div>

      <div className="landingElement" id="about">
        <h1>O nas</h1>
        <div className="aboutUsRow">
          <div className="aboutUsElement">
            <FontAwesomeIcon icon={faUser}/>
            <h3>O zespole</h3>
            <p>
              Jesteśmy zespołem pasjonatów, którzy wierzą, że harmonia w
              rodzinie to klucz do szczęśliwego życia. Naszą misją jest pomóc
              rodzinom organizować się, współpracować i celebrować wspólne
              chwile.
            </p>
          </div>

          <div className="aboutUsElement">
          <FontAwesomeIcon icon={faQuestion}/>
            <h3>Dlaczego FamiLynk?</h3>
            <p>
              Stworzyliśmy FamiLynk z przekonaniem, że każda rodzina zasługuje
              na wyjątkowe narzędzie, które uprości jej życie i uczyni je
              bardziej zorganizowanym. Nasza aplikacja powstała z myślą
              o tych, którzy pragną spędzać więcej czasu z rodziną i mniej czasu
              na zawiłościach organizacyjnych.
            </p>
          </div>

          <div className="aboutUsElement">
          <FontAwesomeIcon icon={faQuestion}/>
            <h3>Co nas inspiruje?</h3>
            <p>
              Nasza inspiracja płynie z przekonania, że życie rodzinne może być
              piękne, jeśli jest dobrze zorganizowane. Chcemy pomóc w tworzeniu
              chwil pełnych uśmiechu i wspólnych doświadczeń.
            </p>
          </div>
        </div>
      </div>

      <div className="landingElement" id="functions">
        <h1>Funkcje Aplikacji</h1>
        <AppFunctions />
      </div>
    </main>
  );
}
