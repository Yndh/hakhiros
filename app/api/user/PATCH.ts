import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'

interface req_body {
    user_house_id: string | number
    display_name: string
}

export async function mPATCH(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowany' }), {
            status: 401
        })
    }
    const body: req_body = await req.json()
    if (!body || !body.user_house_id) {
        return new NextResponse(JSON.stringify({ error: 'nie podano user house id' }), {
            status: 400
        })
    }
    if (!body || !body.display_name) {
        return new NextResponse(JSON.stringify({ error: 'nie podano pseudonimu' }), {
            status: 400
        })
    }
    const user_house = await prisma.user_house.findFirst({
        where: {
            id: parseInt(body.user_house_id as string),
            profile: {
                user_id: session.user.id
            }
        }
    })
    if (!user_house) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono domu użytkownika' }), {
            status: 500
        })
    }
    const updated_profile = await prisma.profile.update({
        where: {
            id: user_house.profile_id
        },
        data: {
            display_name: body.display_name
        }
    })

    return new NextResponse(JSON.stringify(updated_profile), {
        status: 200
    })
}