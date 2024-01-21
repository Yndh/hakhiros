import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'


export async function mGET(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }
    const user_house = await prisma.user_house.findMany({
        select: {
            id: true,
            house: {
                select: {
                    id: true,
                    name: true,
                    code: true,
                    owner: true
                }
            }
        },
        where: {
            profile: {
                user_id: session.user.id
            }
        }
    })

    const houses: Houses = {};

    user_house.forEach(user_house => {
        houses[user_house.id] = { "name": user_house.house.name, "code": user_house.house.code, "isOwner": user_house.house.owner == session.user.id }
    });

    return new NextResponse(JSON.stringify(houses), {
        status: 200
    })
}