import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'


export async function mGET(req: Request, res: NextApiResponse) {

    const dutie = await prisma.dutie.findMany({})

    return new NextResponse(JSON.stringify(dutie), {
        status: 200
    })
}