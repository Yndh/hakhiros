import { prisma } from "./prisma";

export async function createProfile(user_id: string) {

    const user_profile = await prisma.profile.create({
        data: {
            user_id,
        }
    })
    return user_profile.id
}