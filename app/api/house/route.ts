import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { post } from './POST'

async function GET(req: Request, res: NextApiResponse) {
    return new NextResponse(JSON.stringify({ error: 'only POST request allowed' }), {
        status: 405
    })
}

export function POST(req: Request, res: NextApiResponse) {
    return post(req, res)
}