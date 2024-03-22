import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getQuerryParameters } from '@/lib/getQuerryParameters'


export async function mGET(req: Request, res: NextApiResponse) {
    console.info("REFRESH START")
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        console.error("REFRESH ERROR UNAUTHORIZED")
        return new Response('Unauthorized', {
        status: 401,
        });
    }
    try{
        await prisma.user.findFirstOrThrow({
            select:{
                id: true
            }
        })
    }
    catch{
        console.error("REFRESH QUERY ERROR")
    }
    console.info("REFRESH DONE")
    return new NextResponse(JSON.stringify(true), {
        status: 200
    })
}
