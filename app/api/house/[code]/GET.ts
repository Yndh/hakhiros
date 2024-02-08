import { NextApiResponse } from "next";
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function mGET(req: Request, res: NextApiResponse) {
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
    const count_member = await prisma.user_house.aggregate({
        _count: {
            id: true
        },
        where: {
            house_id: house.id
        }
    })
    return new NextResponse(JSON.stringify({ name: house.name, amount: count_member._count.id }), {
        status: 200
    })
}