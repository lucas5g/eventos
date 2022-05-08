import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import bcrypt from 'bcryptjs'


export class UserController {

    static async index(req: Request, res: Response) {

        const users = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                profile: true,
                unity: true
            }
        })
        console.log(users)

        res.send(users)

    }

    static async show(req: Request, res: Response) {

        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                name: true,
                email: true,
                profile: true,
                unity: true
            }
        })

        res.send(user)
    }

    static async create(req: Request, res: Response) {

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
                name: true,
                email: true,
                profile: true,
                unity: true
            }
        })


        res.json(user)
    }

    static async update(req: Request, res: Response) {

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
                    id: Number(req.params.id)
                },
                data: {
                    name,
                    email,
                    // password: await bcrypt.hash(password, salt),
                    profile,
                    unity,
                },
                select:{
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
                id: Number(req.params.id)
            },
            data: {
                name,
                email,
                profile,
                unity,
            },
            select:{
                name: true,
                email: true,
                profile: true,
                unity: true
            }

        })

        return res.json(user)
    }
}

