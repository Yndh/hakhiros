import InvlaidHouseCard from "./invalidHouseCard";
import ValidHouseCard from "./validHouseCard";

export default function HouseCard({ house, code }) {
    return house ? <ValidHouseCard house={house} code={code} /> : <InvlaidHouseCard />
}