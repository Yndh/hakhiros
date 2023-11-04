import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { joinHouse } from '@/lib/joinHouse'

export async function POST(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }
    const code = res.params.code

    const house = await prisma.house.findFirst({
        where: {
            code
        }
    })

    if (!house) {
        return new NextResponse(JSON.stringify({ error: 'zły kod' }), {
            status: 400
        })
    }

    const isUserLogin = await prisma.user_house.aggregate({
        _count: {
            profile_id: true
        },
        where: {
            house_id: house.id,
            profile: {
                user_id: session.user.id
            }
        }
    })
    if (isUserLogin._count.profile_id == 1) {
        return new NextResponse(JSON.stringify({ error: "nie mozesz byc 2 razy w tym samym domu" }), {
            status: 400
        })
    }

    return new NextResponse(JSON.stringify(await joinHouse(session.user.id, house.id)), {
        status: 200
    })
}