import { createProfile } from "./createProfile";
import { prisma } from "./prisma";

export async function joinHouse(user_id: number, house_id: number) {
    const house_exists = await prisma.house.findFirst({
        where: {
            id: house_id
        }
    }).then(Boolean)

    const profile_id = await createProfile(user_id)

    const user_house = await prisma.user_house.create({
        data: {
            house_id,
            profile_id
        }
    })

}