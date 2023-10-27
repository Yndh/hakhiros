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
        return new NextResponse(JSON.stringify({ error: 'wronge code' }), {
            status: 400
        })
    }
    
    const isUserLogin = await prisma.user_house.findMany({
        where:{
            house_id:house.id
        }
    })
    if(isUserLogin.length>=2){
        return new NextResponse(JSON.stringify({error:"nie mozesz byc 2 razy w tym samym domu"}),{
            status: 400
        })
    }

    joinHouse(session.user.id, house.id)

    return new NextResponse(JSON.stringify({ code, name: house.name }), {
        status: 200
    })
}