import { NextApiResponse } from "next";
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { joinHouse } from '@/lib/joinHouse'
import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";
import isMember from "@/lib/isMember";

export async function mPOST(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ path: '/register/' }), {
            status: 307
        })
    }
    const code = res.params.code
    if (!code) {
        return new NextResponse(JSON.stringify({ error: 'nie podano kodu' }), {
            status: 400
        })
    }
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

    if (await isMember(code)) {
        return new NextResponse(JSON.stringify({ error: "nie mozesz byc 2 razy w tym samym domu" }), {
            status: 400
        })
    }

    return new NextResponse(JSON.stringify(await joinHouse(session.user.id, house.id)), {
        status: 200
    })
}