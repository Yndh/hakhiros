import { NextApiResponse } from 'next';

declare module 'next' {
    interface NextApiResponse<T = any> {
        params: {
            code?: string
        }
    }
}
