import OwnerUserTable from "./ownerUserTable"

interface UserTableProps {
    isOwner: boolean
}

export default function UserTable({ isOwner }: UserTableProps) {
    return <>{
        isOwner ? <OwnerUserTable /> : <p>WIP</p>
    }</>
}