import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../config/prisma'
import { auth } from '../../../../middleware/auth'


export default async function guestRegister(req: NextApiRequest, res: NextApiResponse) {

    //@ts-ignore
    const { id } = auth(req, res)

    if (req.method === 'POST') {

        const { emailInvite, numberGuests, students, kgFood, motherEmail, unity,  comments } = req.body

        if(!emailInvite || !numberGuests || !students || !kgFood || !motherEmail || !unity){
            res.status(401)
                .json({msg: 'Todos os campos são obrigatórios'})
            return 
        }

        const registerExist: [] = await prisma.$queryRawUnsafe(`
            select students from events_guests_invite where students like ? or students like ?
        `,
            `%${students[0]}%`,
            `%${students[1]}%`

        )

        if (registerExist.length > 0) {
            res.status(401)
                .json({
                    msg: 'Já foi registrado'
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
            include:{
                user:{
                    select:{
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
               id:idInvite
            }
        })

        console.log({register})
        return res.json({
            msg: 'deletado',
            register
        })
    }

    res.send('method not found')

}