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
                    name: true
                }
            }
        },
        where: {
            profile: {
                user_id: session.user.id
            }
        }
    })

    const houses: { [key: string]: { id: number, name: string } } = {};

    user_house.forEach(user_house => {
        houses[user_house.id] = {
            id: user_house.house.id,
            name: user_house.house.name,
        };
    });

    return new NextResponse(JSON.stringify(houses), {
        status: 200
    })
}