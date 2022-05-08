import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Profile } from '../../../model/Profile'

import { User } from '../../../model/User'

export default async function login(req, res) {
    const { email, password } = req.body
    let fields = []

    if (!email) {
        fields.push('E-mail')
    }
    if (!password) {
        fields.push('Senha')
    }
    if (fields.length > 0) {
        res.status(401).json({
            msg: 'É obrigatório',
            fields
        })
        return
    }
    const user = await User.findOne({
        attributes: ['id', 'name', 'password', 'email', 'profileId'],
        where: { email },
        include: {
            model: Profile,
            attributes: ['id', 'name']
        }
    })

    if (!user) {
        return res
            .status(401)
            .json({
                msg: 'E-mail não cadastrado.'
            })
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res
            .status(401)
            .json({
                msg: 'Senha errada.'
            })
    }
    user.password = undefined

    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        profileId: user.profileId,
        profile: user.profile.name

    }, process.env.TOKEN_KEY, {
        expiresIn: '8h'
    })

    res.json({
        // user,
        token,
        expiresIn: '8h',
    })

}