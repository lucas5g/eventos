import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { prisma } from '../../../libs/prisma'
import { auth } from '../../../utils/auth'
import { UserService } from '../../../services/UserService'
import { error } from '../../../utils/error'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  //@ts-ignore
  const { profile } = auth(req, res)

  if (profile !== 'Admin' && profile !== 'Gerente') {
    return res.status(401).json({ message: 'Sem permissão' })
  }


  if (req.method === 'GET') {
    return res.json(await UserService.findMany())
  }

  if (profile !== 'Admin') {
    return res.status(401).json({ message: 'Sem permissão!' })
  }

  if (req.method === 'POST'){
    try{
      return res.status(201).json(await UserService.create(req.body))
    }catch(e){
      const {status, message} = error(e)
      return res.status(status).json(message)
    }
  }
}