'use client'

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface JoinHouseButtonProps {
    code: string
}

export default function JoinHouseButton({ code }: JoinHouseButtonProps) {
    const router = useRouter()
    const joinHouse = async () => {
        const options = {
            method: "POST",
        };
        const house = await fetch(`/api/house/${code}`, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 307) {
                    router.push("/app");
                }
                return data;
            });
        if ("error" in house) {
            if (house.error === "nie mozesz byc 2 razy w tym samym domu") {
                router.push("/app");
            }
            toast.error(`Wystąpił błąd z udostępnieniem: ${house.error}`);
            return;
        }
        router.push("/app");
    }

    return <button onClick={joinHouse}>Dołącz</button>
}