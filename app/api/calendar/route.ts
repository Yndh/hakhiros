import type { NextApiResponse } from 'next'
import { mPOST } from './POST'


export function POST(req: Request, res: NextApiResponse) {
    return mPOST(req, res)
}