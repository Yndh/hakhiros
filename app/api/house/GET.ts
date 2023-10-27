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
    const houses = await prisma.user_house.findMany({
        select: {
            id: true,
            join_date: true,
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
    return new NextResponse(JSON.stringify(houses), {
        status: 200
    })
}