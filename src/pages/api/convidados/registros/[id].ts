import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../libs/prisma";
import { auth } from "../../../../utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  //@ts-ignore
  const { id } = auth(req, res)

  if (req.method === 'PUT') {
    const { emailInvite, numberGuests, students, kgFood, motherEmail, unity, comments } = req.body

    if (!emailInvite || !numberGuests || !students || !kgFood || !motherEmail || !unity) {
      res.status(401)
        .json({ message: 'Todos os campos são obrigatórios' })
      return
    }


    const register = await prisma.guestInvite.update({
      data: {
        emailInvite,
        numberGuests,
        kgFood,
        comments,
        userId: id
      },
      where: {
        id: Number(req.query.id)
      },
      include: {
        user: {
          select: {
            name: true
          }
        }


      }
    })


    res.json(register)
    return
  }

}


