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
    if (!user_house_id_param) {
        return new NextResponse(JSON.stringify({ error: 'nie poprawne id domu' }), {
            status: 400
        })
    }
    const user_house_id = parseInt(user_house_id_param)

    const profile = await prisma.user_house.findFirst({
        select: {
            profile_id: true,
            house_id: true
        },
        where: {
            id: user_house_id,
            profile: {
                user_id: session.user.id
            }
        }
    })
    if (!profile) {
        return new NextResponse(JSON.stringify({ error: 'nie zależysz do domu' }), {
            status: 400
        })
    }
    const members = await prisma.user_house.findMany({
        where: {
            house_id: profile.house_id
        },
        select: {
            profile: {
                select: {
                    id: true,
                    user_id: true,
                    display_name: true,
                    join_date: true,
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    const house = await prisma.house.findFirst({
        select: {
            owner: true
        },
        where: {
            id: profile.house_id
        }
    })
    if (!house) {
        return new NextResponse(JSON.stringify({ error: 'nie znaleziono domu' }), {
            status: 500
        })
    }
    const members_formated: membersResponse = {};

    members.forEach(member => {
        const id = member.profile.id.toString();
        const user_id = member.profile.user_id
        const name = member.profile.user.name;
        const display_name = member.profile.display_name;
        const join_date = member.profile.join_date.toLocaleDateString()

        members_formated[id] = { name, display_name, is_owner: user_id === house.owner, join_date };
    });

    return new NextResponse(JSON.stringify(members_formated), {
        status: 200
    })
}