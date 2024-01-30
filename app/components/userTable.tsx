import { useEffect, useRef } from "react";
import OwnerUserTable from "./ownerUserTable"
import useUserHouseId from "@/store/useUserHouseId";
import { toast } from "react-toastify";

interface UserTableProps {
    isOwner: boolean
}

export default function UserTable({ isOwner }: UserTableProps) {
    const members = useRef<Members>({})
    const user_house_id = useUserHouseId()
    useEffect(() => {
        fetch(`/api/members?user_house_id=${user_house_id}`)
            .then((res) => res.json())
            .then((data: Members | ErrorRespone) => {
                if ("error" in data) {
                    toast.error(`Wystąpił błąd: ${data["error"]}`);
                    return;
                }
                members.current = data
            });
    }, [user_house_id])
    return <>{
        isOwner ? <OwnerUserTable members={members.current} /> : <p>WIP</p>
    }</>
}