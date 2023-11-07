import type { NextApiResponse } from 'next'
import { mGET } from './GET'
import { mPATCH } from './PATCH'


export function GET(req: Request, res: NextApiResponse) {
    return mGET(req, res)
}

export function PATCH(req: Request, res: NextApiResponse) {
    return mPATCH(req, res)
}