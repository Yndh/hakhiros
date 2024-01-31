import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OwnerUserTableProps {
    members: membersResponse
}

export default function OwnerUserTable({ members }: OwnerUserTableProps) {
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
                            <FontAwesomeIcon icon={faRightFromBracket} className="kick" />
                        </td>
                    </tr>
                })
            }
        </tbody>
    </table>
}