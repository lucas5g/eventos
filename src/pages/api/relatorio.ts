import {NextApiRequest, NextApiResponse} from 'next'
import { prisma } from '../../config/prisma'
import { auth } from '../../middleware/auth'

export default async function report(req: NextApiRequest, res: NextApiResponse){

    auth(req, res)

    const query: [] = await prisma.$queryRawUnsafe(`
        select 
        sum(kgFood) as sumKgFood, sum(numberGuests) as sumNumberGuests
        from events_guests_invite
        limit 1
    `)
    //@ts-ignore
    const report = query[0]
    res.json(report)
}