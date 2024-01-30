import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { isValidColor } from '@/lib/isValidColor'

interface req_body {
    title: string
    description: string
    color: string
    user_house_id: string | number
}

export async function mPOST(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowany' }), {
            status: 401
        })
    }

    const body: req_body = await req.json()
    const { title, description, color } = body
    if (!title || typeof title !== 'string' ||
        !description || typeof description !== 'string' ||
        !color || typeof color !== 'string' ||
        !body.user_house_id || (typeof body.user_house_id !== 'string' && typeof body.user_house_id !== 'number')) {
        return new NextResponse(JSON.stringify({ error: 'zły typ danych lub nie wszystkie podane' }), {
            status: 400
        })
    }

    if (!isValidColor(color)) {
        return new NextResponse(JSON.stringify({ error: 'nie poprawny kolor' }), {
            status: 400
        })
    }

    const user_house_id = parseInt(body.user_house_id as string)
    const profile = await prisma.user_house.findFirst({
        select: {
            profile_id: true,
            house_id: true
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
    const profile_id = profile.profile_id

    const note = await prisma.note.create({
        data: {
            profile_id,
            house_id: profile.house_id,
            title,
            description,
            color
        }
    })

    return new NextResponse(JSON.stringify(note), {
        status: 201
    })
}