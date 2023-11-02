import { prisma } from '@/lib/prisma'
import { generateUniqueCode } from '@/lib/generateUniqueCode'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'

interface req_body {
    house_id: number
    title: string
}


export async function mPOST(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }
    const body: req_body = await req.json()

    if(!body.title || typeof body.title !== 'string'){
        return new NextResponse(JSON.stringify({ error: 'wrong title field' }), {
            status: 400
        })
    }

    if(!body.house_id || typeof body.house_id !== 'number'){
        return new NextResponse(JSON.stringify({ error: 'wrong house_id field' }), {
            status: 400
        })
    }

    const dutie_add = await prisma.dutie.create({
        data:{
            house_id:body.house_id,
            title:body.title,
            is_done:false,
            profile_id:session.user.id
        }
    })


    return new NextResponse(JSON.stringify({ dutie_add }), {
        status: 200
    })
}