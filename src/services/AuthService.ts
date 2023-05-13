import { z } from "zod"
import bcrypt from 'bcryptjs'
import { UserRepository } from "../repositories/UserRepository"
import jwt from "jsonwebtoken"
import { env } from "../utils/env"

const schema = z.object({
  email: z.string().email(),
  password: z.string()
})

export class AuthService {
  static async login(body:any) {
    const { email, password } = schema.parse(body)

    const user = await UserRepository.findByEmail(email)
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('E-mail ou Senha inválidos!')
    }
    const token = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      unity: user.unity
    }, env.JWT_TOKEN, {
      expiresIn: '8h'
    })

    return {token}
  }
}