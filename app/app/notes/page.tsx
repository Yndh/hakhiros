import { AppLayout } from "@/app/components/appLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAdd, faFilter, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import Note from "@/app/components/note";

export default function Notes() {
  const notes = [
    { title: "Hakhiros apka wtf", description: "aplkacja hakhiros czyli centrum domowe", isPinned: true },
    { title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis magna vitae tempor convallis. Nam consectetur, risus id tincidunt tempus, risus enim ornare elit, vitae ullamcorper lorem tellus quis metus. Praesent at dolor risus. Sed eu cursus nisl, ac maximus enim. Suspendisse quis sagittis tellus. Vivamus vel eros hendrerit, vulputate enim vel, luctus nulla. Vivamus porta ex ligula, at porta ex aliquet ut.", isPinned: false },
    { title: "Notatka", description: "Test123", isPinned: false },
  ];

  const sortedNotes = [...notes].sort((a, b) => (b.isPinned ? 1 : -1));

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
        {sortedNotes.map((note) => (
          <Note title={note.title} description={note.description} isPinned={note.isPinned} />
        )) }
      </div>
    </AppLayout>
  );
}
