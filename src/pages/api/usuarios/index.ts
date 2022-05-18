import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { prisma } from '../../../config/prisma'
import { auth } from '../../../middleware/auth'

export default async function users(req: NextApiRequest, res: NextApiResponse) {

    //@ts-ignore
    if (auth(req, res).profile !== 'Admin') {
        res
            .status(401)
            .json({ msg: 'Sem permissão' })

        return
    }

    if (req.method === 'GET') {

        const { search } = req.query

        const users = await prisma.$queryRawUnsafe(`
            Select id, name, email, profile, unity
            from events_users
            where name like ? or email like ? or unity like ? 
            limit 50
        `,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        
        )

        res.send(users)


        // const users = await prisma.user.findMany({
        //     select: {
        //         id: true,
        //         name: true,
        //         email: true,
        //         profile: true,
        //         unity: true
        //     },
        //     where: {
        //         OR: [
        //             {
        //                 //@ts-ignore
        //                 name: { contains: search },
        //             }
        //         ]
        //     }

        // })

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