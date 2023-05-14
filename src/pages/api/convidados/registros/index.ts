import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../libs/prisma'
import { auth } from '../../../../utils/auth'
import { cache } from '../../../../libs/cache'


export default async function guestRegister(req: NextApiRequest, res: NextApiResponse) {

  cache.flushAll()
  const { id } = auth(req, res)

  if (req.method === 'POST') {

    const { emailInvite, numberGuests, students, kgFood, motherEmail, unity, comments } = req.body

    if (!emailInvite || !numberGuests || !students || !kgFood || !motherEmail || !unity) {
      res.status(401)
        .json({ message: 'Todos os campos são obrigatórios' })
      return
    }

    const registerExist: [] = await prisma.$queryRawUnsafe(`
            select students from GuestInvite where students like ? or students like ?
        `,
      `%${students[0]}%`,
      `%${students[1]}%`

    )

    if (registerExist.length > 0) {
      res.status(401)
        .json({
          message: 'Já foi registrado'
        })
      return
    }

    const register = await prisma.guestInvite.create({
      data: {
        emailInvite,
        motherEmail,
        numberGuests,
        students,
        kgFood,
        unity,
        userId: id,
        comments
      },
      include: {
        user: {
          select: {
            name: true
          }
        }


      }

    })

    return res.json(register)

  }



  if (req.method === 'DELETE') {

    const { idInvite, emailInvite } = req.body


    const register = await prisma.guestInvite.delete({
      where: {
        id: idInvite
      }
    })

    console.log({ register })
    return res.json({
      message: 'deletado',
      register
    })
  }

  res.send('method not found')

}