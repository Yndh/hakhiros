import InvlaidHouseCard from "./invalidHouseCard";
import ValidHouseCard from "./validHouseCard";

interface HouseCardProps {
    house: houseCode | null,
    code: string
}

export default function HouseCard({ house, code }: HouseCardProps) {
    return house ? <ValidHouseCard house={house} code={code} /> : <InvlaidHouseCard />
}