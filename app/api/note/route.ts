import { NextResponse } from 'next/server'
import type { NextApiResponse } from 'next'
import { mPOST } from './POST'
import { mGET } from './GET'
import { mDELETE } from '../note/DELETE'


export function POST(req: Request, res: NextApiResponse) {
    return mPOST(req, res)
}

export function GET(req: Request, res: NextApiResponse) {
    return mGET(req, res)
}

export function DELETE(req: Request, res: NextApiResponse) {
    return mDELETE(req, res)
}