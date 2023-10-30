import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getQuerryParameters } from '@/lib/getQuerryParameters'


export async function mGET(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowany' }), {
            status: 401
        })
    }
    const querry_params = getQuerryParameters(req.url)
    const house_id_param = querry_params.house_id
    if (!house_id_param || (typeof house_id_param !== 'string' && typeof house_id_param !== 'number')) {
        return new NextResponse(JSON.stringify({ error: 'nie poprawne id domu' }), {
            status: 400
        })
    }
    const house_id = parseInt(house_id_param as string)

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

    const notes = await prisma.note.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            color: true,
            created_at: true,
            isPinned: true,
        },
        where: {
            profile_id,
            house_id
        }
    })

    return new NextResponse(JSON.stringify(notes), {
        status: 200
    })
}