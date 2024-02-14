import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'

export async function mDELETE(req: Request, res: NextApiResponse): Promise<NextResponse<calendarDeleteResponse>> {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowano' }), {
            status: 401
        })
    }
    const body: calendarDeleteReqBody = await req.json()
    if (!body || !body.calendar_event_id) {
        return new NextResponse(JSON.stringify({ error: 'nie podano id wydarzenia w kalendarzu' }), {
            status: 400
        })
    }

    const calendar = await prisma.calendar.findFirst({
        where: {
            id: parseInt(body.calendar_event_id as string),
            profile: {
                user_id: session.user.id
            }
        }
    })
    if (!calendar) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono wydarzenia w kalendarzu' }), {
            status: 400
        })
    }

    await prisma.calendar.delete({
        where: {
            id: calendar.id
        }
    })

    return new NextResponse(JSON.stringify(calendar), {
        status: 200
    })
}