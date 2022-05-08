import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma'
import { stringify } from 'querystring'

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(401).json({
                msg: 'Todos os campos são obrigatórios'
            })
            return
        }

        const user = await prisma.user.findFirst({
            where: {
                email        
            },
  
        })
        
         if(!user || !await bcrypt.compare(password, user.password)){
            res.status(401).json({
                'msg':'E-mail ou Senha incorreto'
            })
            return
        }

        const TOKEN_KEY = process.env.TOKEN_KEY || ''
        const token = jwt.sign({
            email:  user.email,
            profile: user.profile,
            unity: user.unity,

        }, TOKEN_KEY, {
            expiresIn: '8h'
        })
        console.log(process.env.TOKEN_KEY)
        res.json({
            // user,
            token,
            expiresIn: '8h'
        })

    }

    static async me(req: Request, res: Response){
        //@ts-ignore
        res.json(req.auth)
    }


    static async meAdmin(req: Request, res: Response){
        res.json({
            test: 'tenho q ser admin',
            //@ts-ignore
            req: req.auth
        })
    }
}