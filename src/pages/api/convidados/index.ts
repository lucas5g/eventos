import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../../utils/auth'
import { GuestService } from '../../../services/GuestService'


export default async function guests(req: NextApiRequest, res: NextApiResponse) {
    //@ts-ignore
    const { unity, profile } = auth(req, res)   
    res.json(await GuestService.findMany({unity, profile}))
}

