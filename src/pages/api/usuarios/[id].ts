import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

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

    if (req.method === 'PUT') {

        const { name, email, password, profile, unity } = req.body

        if (!name || !email || !profile || !unity) {
            return res
                .status(401)
                .json({ msg: 'Todos os campos são obrigatórios' })
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const user = await prisma.user.update({
                where: {
                    id: Number(req.query.id)
                },
                data: {
                    name,
                    email,
                    password: await bcrypt.hash(password, salt),
                    profile,
                    unity,
                },
                select: {
                    name: true,
                    email: true,
                    profile: true,
                    unity: true
                }

            })

            return res.json(user)
        }
        const user = await prisma.user.update({
            where: {
                id: Number(req.query.id)
            },
            data: {
                name,
                email,
                profile,
                unity,
            },
            select: {
                name: true,
                email: true,
                profile: true,
                unity: true
            }

        })

        return res.json(user)
    }
}
