import { AppLayout } from "@/app/components/appLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAdd, faFilter } from "@fortawesome/free-solid-svg-icons";

export default function Notes() {
  return (
    <AppLayout active="notes">
      <div className="header">
        <div className="tile first transparent">
          <h1>Notatki</h1>
        </div>
        <div className="tile second transparent row end">
          <button className="shadow icon">
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button className="shadow">Utwórz</button>
          <label className="searchBar" htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Szukaj..." id="search" />
          </label>
        </div>
      </div>

      <div className="appComponents">
        <div className="tile first">
          <p className="title">Notatka</p>
        </div>
      </div>
    </AppLayout>
  );
}
