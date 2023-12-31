import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { getQuerryParameters } from '@/lib/getQuerryParameters'


export async function mGET(req: Request, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: 'nie zautoryzowany' }), {
            status: 401
        })
    }
    const querry_params = getQuerryParameters(req.url)
    const user_house_id_param = querry_params.user_house_id
    if (!user_house_id_param || (typeof user_house_id_param !== 'string' && typeof user_house_id_param !== 'number')) {
        return new NextResponse(JSON.stringify({ error: 'nie poprawne id domu' }), {
            status: 400
        })
    }
    const user_house_id = parseInt(user_house_id_param as string)
    const user_house = await prisma.user_house.findFirst({
        select: {
            profile: {
                select: {
                    display_name: true,
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }

        },
        where: {
            id: user_house_id,
            profile: {
                user_id: session.user.id
            }
        }
    })
    if (!user_house) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono profilu' }), {
            status: 400
        })
    }
    return new NextResponse(JSON.stringify({ "name": user_house.profile.user.name, "display_name": user_house.profile.display_name }), {
        status: 200
    })
}