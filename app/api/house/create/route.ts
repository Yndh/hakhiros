import { getServerSession } from 'next-auth/next'
import { authOptions } from './../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { generateCode } from '@/lib/generateCode'
import { generateUniqueCode } from '@/lib/generateUniqueCode'

interface req_body {
    house_name: String
}

const HOUSE_CODE_LENGHT = 8;

export async function GET(req: Request, res: NextApiResponse) {
    return new NextResponse(JSON.stringify({ error: 'only POST request allowed' }), {
        status: 405
    })
}

export async function POST(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }
    const body: req_body = await req.json()
    if (!body.house_name || typeof body.house_name !== 'string') {
        return new NextResponse(JSON.stringify({ error: 'wrong house name field' }), {
            status: 400
        })
    }
    const created_by = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!created_by) {
        return new NextResponse(JSON.stringify({ error: 'user not found' }), {
            status: 500
        })
    }

    const house = await prisma.house.create({
        data: {
            owner: created_by.id,
            name: body.house_name,
            code: await generateUniqueCode(HOUSE_CODE_LENGHT),
        }
    })

    return new NextResponse(JSON.stringify({ title: body.house_name }), {
        status: 200
    })
}
