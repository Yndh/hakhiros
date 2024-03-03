import Card from "../card";

export default function InvlaidHouseCard() {
    return <Card classes="invite">
        <p className="thin" style={{ opacity: 0.5 }}>
            Zostałeś zaproszony do domu
        </p>
        <h2>kod zaproszenia jest niepoprawny</h2>
        <button>
            Powrót do strony głównej
        </button>
    </Card>
}