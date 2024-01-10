import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./landing.css";
import {
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AppFunctions from "./components/appFunctions";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import FAQ from "./components/faq";
import Image from "next/image";

export default function Home() {
  return (
    <main className="landingContainer" id="start">
      <header className="landingHeader">
        <div className="logo">
          <Image src="/logo.svg" alt="logo" />
          <p>FamiLynk</p>
        </div>
        <ul className="landingNav">
          <li>
            <a href="/#start">Start</a>
          </li>
          <li>
            <a href="/#about">O nas</a>
          </li>
          <li>
            <a href="/#functions">Funkcje</a>
          </li>
          <li>
            <a href="/#faq">FAQ</a>
          </li>
          <li>
            <a href="/login">
              <button>Zaloguj sie</button>
            </a>
          </li>
        </ul>
      </header>

      <div className="heroContainer">
        <h1>Twoje rodzinne centrum organizacji</h1>
        <a href="/login"><button>Sprawdź FamiLynk</button></a>
        <Image src="/houseBaner.svg" alt="" />
      </div>

      <div className="landingElement" id="about">
        <h1>O nas</h1>
        <div className="aboutUsRow">
          <div className="aboutUsElement">
            <FontAwesomeIcon icon={faUser} />
            <h3>O zespole</h3>
            <p>
              Jesteśmy zespołem pasjonatów, którzy wierzą, że harmonia w
              rodzinie to klucz do szczęśliwego życia. Naszą misją jest pomóc
              rodzinom organizować się, współpracować i celebrować wspólne
              chwile.
            </p>
          </div>

          <div className="aboutUsElement">
            <FontAwesomeIcon icon={faQuestion} />
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
            <FontAwesomeIcon icon={faQuestion} />
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

      <div className="landingElement" id="faq">
        <h1>FAQ</h1>

        <FAQ />
      </div>

      <footer>
        <div className="footerRow">
          <div className="logo">
            <h1>FamiLynk</h1>
            <p>Twoje centrum organizacji</p>
          </div>

          <div className="links">
            <p>Strona Główna</p>
            <a href="/#start">Start</a>
            <a href="/#about">O nas</a>
            <a href="/#functions">Funkcje</a>
            <a href="/#faq">Funkcje</a>

          </div>

          <div className="links">
            <p>Ogólne</p>
            <a href="/login">Zaloguj się</a>
            <a href="/register">Zarejestruj się</a>
          </div>

          <div className="links">
            <p>Autorzy</p>
            <a href="https://github.com/Yndh">Yndh</a>
            <a href="https://github.com/Qlesuga">Qłesuga</a>
            <a href="https://github.com/MarcinSzablak">JerzTuptus</a>
            <a href="https://github.com/IB2R5IMarcinSzablak">IB2R5</a>
          </div>



        </div>
        <div className="footerCol">
          <div className="socialRow">
            <a href="https://github.com/Yndh/hakhiros" className="social"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
          <p>&copy;Copyright All right reserved</p>
        </div>
      </footer>
    </main>
  );
}
