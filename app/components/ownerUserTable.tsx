import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OwnerUserTable() {
    return <table className="users">
        <thead>
            <tr>
                <th>Użytkownik</th>
                <th>Data dolączenia</th>
                <th>Akcje</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>@user2137</td>
                <td>31.10.2023</td>
                <td>
                    <FontAwesomeIcon icon={faRightFromBracket} className="kick" />
                </td>
            </tr>

            <tr>
                <td>@user2</td>
                <td>31.10.2023</td>
                <td>
                    <FontAwesomeIcon icon={faRightFromBracket} className="kick" />
                </td>
            </tr>
        </tbody>
    </table>
}