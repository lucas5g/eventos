import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../config/prisma'
import { auth } from '../../../middleware/auth'

export default async function users(req: NextApiRequest, res: NextApiResponse) {

    //@ts-ignore
    auth(req, res)
  
    if (req.method === 'GET') {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                profile: true,
                unity: true
            }
        })

        res.send(users)
    }
}