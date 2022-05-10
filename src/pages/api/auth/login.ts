import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { prisma } from '../../../config/prisma'



export default async function guests(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(401).json({
            msg: 'Todos os campos são obrigatórios!'
        })
        return
    }

    const user = await prisma.user.findFirst({
        where: {
            email
        },

    })

    if (!user || !await bcrypt.compare(password, user.password)) {
        res.status(401).json({
            'msg': 'E-mail ou Senha incorreto!'
        })
        return
    }

    const TOKEN_KEY = process.env.TOKEN_KEY || ''
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
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
   
    

