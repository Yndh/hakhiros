import QRCode from "react-qr-code";
import Card from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

interface InvateProps {
    code: string
}

export default function Invate({ code }: InvateProps) {

    const getInviteUrl = () => {
        if (typeof window == 'undefined') {
            return "http://localhost:3000/invite/${code}"
        }
        const port = window.location.port;
        const baseUrl = `${window.location.protocol}//${window.location.hostname}`;

        return port ? `${baseUrl}:${port}/invite/${code}` : `${baseUrl}/invite/${code}`;

    }

    const shareHandler = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        try {
            await navigator.share({
                title: "Zaprosznie do domu",
                text: "Dołącz do mojego domu",
                url: getInviteUrl(),
            });
        } catch (err) {
            toast.error(`Wystąpił błąd z udostępnieniem: ${err}`);
        }
    };

    const copyInviteHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await navigator.clipboard.writeText(
                getInviteUrl()
            );
            toast.success('Zaproszenie zostało skopiowane do schowka!');
        } catch (err: any) {
            toast.error(`Wystąpił błąd podczas kopiowania zaproszenia ${err.message}`);
        }
    }

    return <Card>
        <h2 className="title">Zaproszenie</h2>
        <div className="qrCode">
            <QRCode
                value={getInviteUrl()}
                width={256}
                style={{ height: "auto" }}
            />
            <span className="or">lub</span>
            <button className="box" onClick={shareHandler}>
                <FontAwesomeIcon icon={faShare} />
            </button>
        </div>
        <button
            onClick={copyInviteHandler}>
            <FontAwesomeIcon icon={faCopy} />
            Kopiuj Zaproszenie
        </button>
    </Card>
}