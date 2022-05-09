import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../config/prisma'
import { auth } from '../../../middleware/auth'

export default async function users(req: NextApiRequest, res: NextApiResponse) {

    auth(req, res)

    if (req.method === 'GET') {
        const { id } = req.query
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: true,
                unity: true
            }
        })

        res.send(user)
    }
}