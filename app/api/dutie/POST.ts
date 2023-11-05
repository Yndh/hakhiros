import { prisma } from '@/lib/prisma'
import { generateUniqueCode } from '@/lib/generateUniqueCode'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'

interface req_body {
    user_house_id: number | string
    profile_id: number | string
    title: string
    week_day: string | number
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

    if (!body.user_house_id || !(typeof body.user_house_id === 'string' || typeof body.user_house_id === 'number')) {
        return new NextResponse(JSON.stringify({ error: 'złe id domu' }), {
            status: 400
        })
    }

    if (!body.profile_id || !(typeof body.profile_id === 'string' || typeof body.profile_id === 'number')) {
        return new NextResponse(JSON.stringify({ error: 'złe id profilu' }), {
            status: 400
        })
    }

    if (!body.week_day || !(typeof body.week_day === 'string' || typeof body.week_day === 'number')) {
        return new NextResponse(JSON.stringify({ error: 'zły dzień tygodnia' }), {
            status: 400
        })
    }
    const week_day = parseInt(body.week_day as string)
    if (week_day > 6 || week_day < 0) {
        return new NextResponse(JSON.stringify({ error: 'zły dzień tygodnia' }), {
            status: 400
        })
    }
    const profile_id = parseInt(body.profile_id as string)
    const user_house_id = parseInt(body.user_house_id as string)
    const profile = await prisma.user_house.findFirst({
        select: {
            profile_id: true
        },
        where: {
            id: user_house_id
        }
    })
    if (!profile) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono profilu' }), {
            status: 400
        })
    }

    const dutie = await prisma.dutie.create({
        data: {
            house_id: user_house_id,
            title: body.title,
            is_done: false,
            profile_id,
            week_day
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