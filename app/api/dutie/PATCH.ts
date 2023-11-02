import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'

interface req_body {
    dutie_id: number
}

export async function mPATCH(req: Request, res: NextApiResponse){
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowany' }), {
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
            profile_id: session.user.id
        }
    })

    if (!dutie) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono obowiazku' }), {
            status: 400
        })
    }

    const update_dutie = await prisma.dutie.update({
        where: {
            id: dutie.id
        },
        data: {
            is_done: true
        }
    })

    return new NextResponse(JSON.stringify(update_dutie), {
        status: 200
    })
}
