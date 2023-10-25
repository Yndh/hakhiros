import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { post } from './POST'
import { get } from './GET'

export function GET(req: Request, res: NextApiResponse) {
    return get(req, res)
}

export function POST(req: Request, res: NextApiResponse) {
    return post(req, res)
}