import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "./card"
import { faCrown } from "@fortawesome/free-solid-svg-icons"

interface MemberListProps {
    members: Members
}

export default function MemberList({ members }: MemberListProps) {
    return <Card>
        <h2 className="title">Użytkownicy</h2>
        <ul className="userList">
            {Object.keys(members).map((key) => (
                <li key={key}>
                    <span className="username">
                        {members[key]["display_name"]
                            ? members[key]["display_name"]
                            : members[key]["name"]}
                        {members[key]["is_owner"] ? (
                            <FontAwesomeIcon icon={faCrown} />
                        ) : (
                            ""
                        )}
                    </span>
                    <span className="handle">{members[key]["name"]}</span>
                </li>
            ))}
        </ul>
    </Card>
}
