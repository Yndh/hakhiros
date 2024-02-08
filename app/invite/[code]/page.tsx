'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../components/card";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";

export default function Invite({ params }: { params: { code: string } }) {
  const router = useRouter()
  const code = params.code
  const [house, setHouse] = useState<{ name: string; amount: number } | null>(null);

  useEffect(() => {
    const fetchHouse = async () => {
      const response = await fetch(`/api/house/${params.code}`);
      const data = await response.json();
      if ("error" in data) {
        toast.error(`Wystąpił błąd z udostępnieniem: ${data.error}`);
      }
      setHouse(data);
    };

    fetchHouse();
  }, [params.code]);

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

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fullContainer">
      <Card classes="invite">
        <p className="thin" style={{ opacity: 0.5 }}>
          Zostałeś zaproszony do domu
        </p>
        <h1>{house.name}</h1>
        <p className="thin">
          <FontAwesomeIcon icon={faUser} />
          <span>{house.amount} użytkowników</span>
        </p>
        <button onClick={joinHouse}>Dołącz</button>
      </Card>
    </div>
  );
}
