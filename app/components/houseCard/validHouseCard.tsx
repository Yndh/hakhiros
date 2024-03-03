import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../card";
import JoinHouseButton from "../joinHouseButton";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function ValidHouseCard({ house, code }) {
    return <Card classes="invite">
        <p className="thin" style={{ opacity: 0.5 }}>
            Zostałeś zaproszony do domu
        </p>
        <h1>{house.name}</h1>
        <p className="thin">
            <FontAwesomeIcon icon={faUser} />
            <span>{house.amount} użytkowników</span>
        </p>
        <JoinHouseButton code={code} />
    </Card>
}