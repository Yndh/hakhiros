import { getServerSession } from "next-auth"
import { prisma } from "./prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function isMember(code: string): Promise<boolean> {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return false
    }
    const isMember = await prisma.user_house.findFirst({
        where: {
            profile: {
                user_id: session.user.id
            },
            house: {
                code: code
            }
        }
    })
    if (isMember) {
        return true
    }
    return false
}