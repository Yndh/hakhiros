import "./landing.css"

export default function Home() {
  return (
    <main className="landingContainer">
      <header className="landingHeader">
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
          <p>FamiLynk</p>
        </div>
        <ul className="landingNav">
          <li><a href="">Lorem</a></li>
          <li><a href="">Ipsum</a></li>
          <li><a href="">Lorem</a></li>
          <li><a href="">Ipsum</a></li>
          <li><a href=""><button>Zaloguj sie</button></a></li>
        </ul>
      </header>

      <div className="heroContainer">
      <a href="/app"><button>FamiLynk</button></a>
      </div>
    </main>
  );
}
