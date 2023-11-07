import { createProfile } from "./createProfile";
import { prisma } from "./prisma";

export async function joinHouse(user_id: number, house_id: number) {
    const house = await prisma.house.findFirst({
        select: {
            name: true,
            code: true
        },
        where: {
            id: house_id
        }
    })
    if (!house) {
        return null
    }
    const profile_id = await createProfile(user_id)

    const user_house = await prisma.user_house.create({
        data: {
            house_id,
            profile_id
        }
    })
    return { [user_house.id]: { "name": house.name, "code": house.code } }
}