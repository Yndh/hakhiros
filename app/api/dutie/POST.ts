import { prisma } from '@/lib/prisma'
import { generateUniqueCode } from '@/lib/generateUniqueCode'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'

interface req_body {
    house_id: number | string
    title: string
}


export async function mPOST(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }
    const body: req_body = await req.json()

    if (!body.title || typeof body.title !== 'string') {
        return new NextResponse(JSON.stringify({ error: 'zły tytuł' }), {
            status: 400
        })
    }

    if (!body.house_id || !(typeof body.house_id === 'string' || typeof body.house_id === 'number')) {
        return new NextResponse(JSON.stringify({ error: 'złe id domu' }), {
            status: 400
        })
    }

    const house_id = parseInt(body.house_id as string)
    const profile = await prisma.user_house.findFirst({
        select: {
            profile_id: true
        },
        where: {
            house_id
        }
    })
    if (!profile) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono profilu' }), {
            status: 400
        })
    }

    const dutie = await prisma.dutie.create({
        data: {
            house_id: house_id,
            title: body.title,
            is_done: false,
            profile_id: profile.profile_id
        },
        select: {
            id: true,
            title: true,
            is_done: true
        }
    })


    return new NextResponse(JSON.stringify({ dutie }), {
        status: 200
    })
}