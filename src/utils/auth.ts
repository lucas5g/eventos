import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { env } from './env'

export const auth = (req: NextApiRequest, res: NextApiResponse) => {

  //@ts-ignore
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]


  // console.log(req.headers)
  if (!token) {
    throw new Error('A token is required for authentication')
  }
  interface UserInterface{
    id:number
    unity: 'BH' | 'Contagem' | 'EPSA' | 'Gutierrez' | 'NovaLima' | 'SIC'
    profile: 'Admin' | 'Gerente' | 'Operador'
  }

  const user = jwt.verify(token, env.JWT_TOKEN) as UserInterface;
  if(!user){
    throw new Error('Invalid token')
  }

  return user

}

