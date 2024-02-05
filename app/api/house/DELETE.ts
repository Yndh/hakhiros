import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

interface req_body {
    user_house_id: number | string
}

export async function mDELETE(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }
    const { user_house_id }: req_body = await req.json()
    const user_house = await prisma.user_house.findFirst({
        where: {
            id: parseInt(user_house_id.toString()),
            profile: {
                user_id: session.user.id
            }
        }
    })

    if (!user_house) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono domu' }), {
            status: 403
        })
    }
    const house = await prisma.house.findFirst({
        where: {
            id: user_house.house_id
        }
    })
    if (!house) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono domu' }), {
            status: 403
        })
    }

    if (house.owner === session.user.id) {
        await prisma.house.deleteMany({
            where: {
                id: house.id
            }
        })
        return new NextResponse(JSON.stringify({ name: house.name }), {
            status: 200
        })
    }

    if (!user_house) {
        return new NextResponse(JSON.stringify({ error: 'not in house' }), {
            status: 403
        })
    }
    await prisma.user_house.delete({
        where: {
            id: user_house.id
        }
    })
    return new NextResponse(JSON.stringify({ name: house.name }), {
        status: 200
    })
}