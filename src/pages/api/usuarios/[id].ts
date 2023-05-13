import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { prisma } from '../../../libs/prisma'
import { auth } from '../../../utils/auth'

interface Authenticated {
    profile: string
}

export default async function users(req: NextApiRequest, res: NextApiResponse) {

    // console.log(auth(req, res))
    const { method } = req

    //@ts-ignore
    const { profile } = auth(req, res)

    if (profile !== 'Admin' && profile !== 'Gerente') {
        res.status(401)
            .json({ message: 'Sem permissão' })

        return
    }

    if (method === 'GET') {
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

        return res.send(user)

    }

    if (method === 'PUT') {

        const { name, email, password, profile, unity } = req.body

        const emailExistOtherUser:[] = await prisma.$queryRawUnsafe(`
            select id, email from events_users
            where id != ? and email = ?
        `,
            req.query.id,
            email
        )
        console.log({ emailExistOtherUser })
        if(emailExistOtherUser.length > 0){
            return res 
                .status(401)
                .json({ message: 'Já tem usuário com esté email.'})
        }


        if (!name || !email || !profile || !unity) {
            return res
                .status(401)
                .json({ message: 'Todos os campos são obrigatórios' })
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

    /**
     * Evitar utilizar está funcçao
     */
    if (method === 'DELETE') {

        // const user = await prisma.user.delete({
        //     where: {
        //         id: Number(req.query.id)
        //     }
        // })


        res.json({
            message: 'User deleted',
            // user
        })

    }
}
