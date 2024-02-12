import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../components/card";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import JoinHouseButton from "@/app/components/joinHouseButton";
import isMember from "@/lib/isMember";
import { redirect } from "next/navigation";

export default async function Invite({ params }: { params: { code: string } }) {
  const code = params.code

  if (await isMember(code)) {
    redirect("/app")
  }

  const response = await fetch(`http://localhost:3000/api/house/${params.code}`);
  const house = await response.json();

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
        <JoinHouseButton code={code} />
      </Card>
    </div>
  );
}