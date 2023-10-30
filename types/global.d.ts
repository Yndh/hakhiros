interface UserHouse {
    id: number
    join_date: Date
    house: {
        id: number
        name: string
    }
}

interface UserHouseContex {
    userHouses: UserHouse[]
    userHouseId: number
    setUserHouseId: Dispatch<SetStateAction<number>>
}