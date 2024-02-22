import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function mDELETE(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }

    const { profile_id, user_house_id }: membersDeleteReqBody = await req.json()
    if (!profile_id || isNaN(parseInt(profile_id.toString())) || !user_house_id || isNaN(parseInt(user_house_id.toString()))) {
        return new NextResponse(JSON.stringify({ error: 'nie poprawne parametry' }), {
            status: 400
        })
    }

    const profile = await prisma.profile.findFirst({
        where: {
            id: parseInt(profile_id.toString())
        },
        select: {
            user: true
        }
    })
    if (profile?.user.id == session.user.id) {
        return new NextResponse(JSON.stringify({ error: 'nie możesz wyrzucić samego siebie' }), {
            status: 400
        })
    }
    const user_house = await prisma.user_house.findFirst({
        where: {
            id: parseInt(user_house_id.toString())
        }
    })

    if (!user_house) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono domu użytkownika' }), {
            status: 403
        })
    }

    const house = await prisma.house.findFirst({
        where: {
            id: user_house.house_id
        }
    })

    if (!house) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono domu' }), {
            status: 403
        })
    }

    if (house.owner != session.user.id) {
        return new NextResponse(JSON.stringify({ error: "nie jesteś właścicielem domu" }), {
            status: 400
        })
    }

    const member_user_house = await prisma.user_house.findFirst({
        where: {
            house_id: house.id,
            profile_id: parseInt(profile_id.toString())
        }
    })

    await prisma.user_house.delete({
        where: {
            id: member_user_house?.id
        }
    })

    return new NextResponse(JSON.stringify({ name: profile?.user.name }), {
        status: 200
    })
}