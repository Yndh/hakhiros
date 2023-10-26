import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { mPOST } from './POST'
import { mGET } from './GET'
import { mDELETE } from './DELETE'

export function GET(req: Request, res: NextApiResponse) {
    return mGET(req, res)
}

export function POST(req: Request, res: NextApiResponse) {
    return mPOST(req, res)
}

