import { z } from "zod";
import bcrypt from 'bcryptjs'
import { UserRepository } from "../repositories/UserRepository";


const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  unity: z.enum(['BH', 'Contagem', 'EPSA', 'Gutierrez', 'NovaLima', 'SIC']),
  profile: z.enum(['Admin', 'Gerente', 'Operador'])
})

const schemaUpdate = schema.extend({
  password: z.string().optional()
})

export class UserService{
  
  static async findMany(){
    return await UserRepository.findMany()
  }

  static async findById(id:number){
    return await UserRepository.findById(id)
  }

  static async update(id:number, data:any){
    const user = schemaUpdate.parse(data)

    if(user.password){
      user.password = await bcrypt.hash(user.password, 12)
    }

    return await UserRepository.update(id, user)
  }

  static async create(data:any){
    const user = schema.parse(data)
    user.password = await bcrypt.hash(user.password, 12)

    if(await UserRepository.findByEmail(user.email)){
      throw new Error(`O ${user.email} já está sendo utilizado.`)
    }

    return await UserRepository.create(user)
  }

  static async delete(id: number){
    return await UserRepository.delete(id)
  }



}