import { AppLayout } from "@/app/components/appLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAdd, faFilter } from "@fortawesome/free-solid-svg-icons";

export default function Notes() {
  return (
    <AppLayout active="notes">
      <div className="header">
        <h1>Notatki</h1>
        <div className="row">
          <button className="box">
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button>Utwórz</button>
          <label className="searchBar" htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Szukaj..." id="search" />
          </label>
        </div>
      </div>

      <div className="cardRow">
        <div className="card">
          <h2 className="title">Notatka</h2>
        </div>
      </div>
    </AppLayout>
  );
}
