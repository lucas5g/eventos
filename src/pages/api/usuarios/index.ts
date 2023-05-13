import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { prisma } from '../../../libs/prisma'
import { auth } from '../../../utils/auth'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    //@ts-ignore
    const { profile } = auth(req, res)
    console.log({ profile })

    if (profile !== 'Admin' && profile !== 'Gerente') {
        return res.status(401).json({ message: 'Sem permissão' })
    }


    if (req.method === 'GET') {

        const { search } = req.query

        const users = await prisma.$queryRawUnsafe(`
            Select id, name, email, profile, unity
            from events_users
            where name like ? or email like ? or unity like ? or profile like ?
            order by unity, name
            limit 50
        `,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,

        )

        return res.send(users)
    }

    if (profile !== 'Admin') {
        res.status(401)
            .json({ message: 'Sem permissão!' })

        return
    }

    if (req.method === 'POST' && profile === 'Admin') {
        const { name, email, password, profile, unity } = req.body

        if (!name || !email || !password || !profile || !unity) {
            return res
                .status(401)
                .json({ message: 'Todos os campos são obrigatórios' })
        }


        const emailExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (emailExist) {
            return res
                .status(401)
                .json({ message: 'E-mail já cadastrado!' })
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


        return res.json(user)
    }

    return res.status(404).json({
        message: 'Route not found'
    })
}