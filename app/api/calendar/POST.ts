import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { isValidColor } from '@/lib/isValidColor'
import { dateIsValid } from '@/lib/isDateValid'

interface req_body {
    house_id: number | string
    title: string
    start: string
    end: string
    color: string
}

export async function mPOST(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowany' }), {
            status: 401
        })
    }
    const body: req_body = await req.json()
    const { title, start, end, color } = body
    if (
        !body.house_id || !(typeof body.house_id === 'string' || typeof body.house_id === 'number') ||
        !title || typeof title !== 'string' ||
        !start || typeof start !== 'string' ||
        !end || typeof end !== 'string' ||
        !color || typeof color !== 'string' || !isValidColor(color)) {
        return new NextResponse(JSON.stringify({ error: 'zły typ danych lub nie wszystkie podane' }), {
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
    const profile_id = profile.profile_id
    const start_date = new Date(start)
    const end_date = new Date(end)
    if (!dateIsValid(start_date) || !dateIsValid(end_date)) {
        return new NextResponse(JSON.stringify({ error: 'zły format daty' }), {
            status: 400
        })
    }

    const calendar = await prisma.calendar.create({
        data: {
            profile_id,
            house_id,
            title,
            start: start_date,
            end: end_date,
            color
        },
        select: {
            id: true,
            profile_id: false,
            house_id: true,
            title: true,
            start: true,
            end: true,
            color: true
        }
    })

    return new NextResponse(JSON.stringify(calendar), {
        status: 200
    })
}