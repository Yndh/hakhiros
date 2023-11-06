import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/card";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Invite() {
  return (
    <div className="fullContainer">
      <Card classes="invite">
        <p className="thin" style={{ opacity: 0.5 }}>
          Zostałeś zaproszony do domu
        </p>
        <h1>NAZWA DOMU</h1>
        <p className="thin">
          <FontAwesomeIcon icon={faUser} />
          <span>{3} użytkowników</span>
        </p>
        <button>Dołącz</button>
      </Card>
    </div>
  );
}
