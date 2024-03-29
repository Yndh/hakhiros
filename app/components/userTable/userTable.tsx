import { useEffect, useRef } from "react";
import OwnerUserTable from "./ownerUserTable"
import useUserHouseId from "@/store/useUserHouseId";
import { toast } from "react-toastify";
import MemberUserTable from "./memberUserTable";

interface UserTableProps {
    isOwner: boolean
}

export default function UserTable({ isOwner }: UserTableProps) {
    const members = useRef<membersResponse>({})
    const user_house_id = useUserHouseId()
    useEffect(() => {
        if (user_house_id == "" || user_house_id == "-1") {
            return
        }
        fetch(`/api/members?user_house_id=${user_house_id}`)
            .then((res) => res.json())
            .then((data: membersResponse | ErrorRespone) => {
                if ("error" in data) {
                    toast.error(`Wystąpił błąd: ${data["error"]}`);
                    return;
                }
                members.current = data
            });
    }, [user_house_id])
    return <>{
        Object.keys(members.current).length > 0 ?
            isOwner ? <OwnerUserTable members={members.current} /> : <MemberUserTable members={members.current} />
            : <div>Loading</div>}

    </>
}