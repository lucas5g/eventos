import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { prisma } from '../../../libs/prisma'
import { auth } from '../../../utils/auth'
import { UserService } from '../../../services/UserService'
import { error } from '../../../utils/error'

interface Authenticated {
  profile: string
}

export default async function users(req: NextApiRequest, res: NextApiResponse) {

  // console.log(auth(req, res))
  const { method } = req
  const id = Number(req.query.id)

  //@ts-ignore
  const { profile } = auth(req, res)

  if (profile !== 'Admin' && profile !== 'Gerente') {
    return res.status(401).json({ message: 'Sem permissão' })
  }

  if (method === 'PUT') {
    try{
      return res.json(await UserService.update(id, req.body))
    }catch(e){
      const {status, message} = error(e)
      return res.status(status).json(message)
    }
  }

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

  return res.json(await UserService.findById(id))

}
