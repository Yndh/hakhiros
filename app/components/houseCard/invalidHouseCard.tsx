import Card from "../card";
import { useRouter } from "next/navigation";

export default function InvlaidHouseCard() {
    const router = useRouter()

    const redirect = () => {
        router.push("/")
    }

    return <Card classes="invite">
        <p className="thin" style={{ opacity: 0.5 }}>
            Zostałeś zaproszony do domu
        </p>
        <h2>kod zaproszenia jest niepoprawny</h2>
        <button onClick={redirect}>
            Powrót do strony głównej
        </button>
    </Card>
}