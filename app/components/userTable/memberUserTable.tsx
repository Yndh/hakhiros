interface OwnerUserTableProps {
    members: membersResponse
}

export default function MemberUserTable({ members }: OwnerUserTableProps) {
    return <table className="users">
        <thead>
            <tr>
                <th>Użytkownik</th>
                <th>Data dolączenia</th>
            </tr>
        </thead>
        <tbody>
            {
                Object.keys(members).map((key) => {
                    return <tr key={key}>
                        <td>@{members[key].name}</td>
                        <td>{new Date(members[key].join_date).toLocaleDateString()}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}