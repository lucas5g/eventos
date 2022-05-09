import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

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


    if (req.method === 'POST') {
        const { name, email, password, profile, unity } = req.body

        if (!name || !email || !password || !profile || !unity) {
            return res
                .status(401)
                .json({ msg: 'Todos os campos são obrigatórios' })
        }


        const emailExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (emailExist) {
            return res
                .status(401)
                .json({ msg: 'E-mail já cadastrado!' })
        }

        // return res.send({ name, email, password, profile, unity })

        const salt = await bcrypt.genSalt(10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, salt),
                profile,
                unity
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: true,
                unity: true
            }
        })


        res.json(user)
    }
}