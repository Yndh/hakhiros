import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'

interface req_body {
    dutie_id: number
}

export async function mDELETE(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowano' }), {
            status: 401
        })
    }

    const body: req_body = await req.json()
    if (!body || !body.dutie_id) {
        return new NextResponse(JSON.stringify({ error: 'nie podano id obowiazku' }), {
            status: 400
        })
    }

    const dutie = await prisma.dutie.findFirst({
        where: {
            id: body.dutie_id,
        }
    })

    if (!dutie) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono obowiazku' }), {
            status: 400
        })
    }

    const house = await prisma.user_house.findFirst({
        where: {
            house_id: dutie.house_id,
            profile: {
                user_id: session.user.id
            }
        }
    })

    if (!house) {
        return new NextResponse(JSON.stringify({ error: 'nie należysz do domu' }), {
            status: 400
        })
    }

    await prisma.dutie.delete({
        where: {
            id: dutie.id
        }
    })

    return new NextResponse(JSON.stringify(dutie), {
        status: 200
    })
}