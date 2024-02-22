import useUserHouseId from "@/store/useUserHouseId";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

interface OwnerUserTableProps {
    members: membersResponse
}

export default function OwnerUserTable(props: OwnerUserTableProps) {
    const [members, setMembers] = useState(props.members)
    const user_house_id = useUserHouseId()
    const kickMember = async (profile_id: string) => {
        const body: membersDeleteReqBody = {
            user_house_id,
            profile_id
        }
        const options = {
            method: "DELETE",
            body: JSON.stringify(body),
        };
        const user = await fetch("/api/members", options)
            .then((res) => res.json())
            .then((data) => data);
        if ("error" in user) {
            toast.error(`Wystąpił błąd: ${user.error}`);
            return;
        }
        setMembers((members) => {
            delete members[profile_id]
            return { ...members }
        });
        toast.success(`Poprawnie wyrzucono: ${user.name}`);
    };
    return <table className="users">
        <thead>
            <tr>
                <th>Użytkownik</th>
                <th>Data dolączenia</th>
                <th>Akcje</th>
            </tr>
        </thead>
        <tbody>
            {
                Object.keys(members).map((key) => {
                    return <tr key={key}>
                        <td>@{members[key].name}</td>
                        <td>{new Date(members[key].join_date).toLocaleDateString()}</td>
                        <td>
                            <FontAwesomeIcon icon={faRightFromBracket} className="kick" onClick={() => kickMember(key)} />
                        </td>
                    </tr>
                })
            }
        </tbody>
    </table>
}