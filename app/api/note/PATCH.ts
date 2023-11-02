import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { isValidColor } from '@/lib/isValidColor'

interface req_body {
    note_id: string
}

export async function mPATCH(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowany' }), {
            status: 401
        })
    }
    const body: req_body = await req.json()
    if (!body || !body.note_id) {
        return new NextResponse(JSON.stringify({ error: 'nie podano id notatki' }), {
            status: 400
        })
    }

    const note = await prisma.note.findFirst({
        where: {
            id: parseInt(body.note_id as string),
            profile: {
                user_id: session.user.id
            }
        }
    })
    if (!note) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono notatki' }), {
            status: 400
        })
    }

    const update_note = await prisma.note.update({
        where: {
            id: note.id
        },
        data: {
            isPinned: !note.isPinned
        }
    })
    return new NextResponse(JSON.stringify(update_note), {
        status: 200
    })
}