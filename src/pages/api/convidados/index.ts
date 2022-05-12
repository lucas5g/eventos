import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../config/prisma'
import { auth } from '../../../middleware/auth'


export default async function guests(req: NextApiRequest, res: NextApiResponse) {

    auth(req, res)
    if (req.method === 'GET') {
        
        const { search } = req.query
        const guests = await prisma.$queryRawUnsafe(`
        SELECT 
        g.mother, g.motherEmail, g.father, g.fatherEmail, 
        gi.emailInvite, gi.numberGuests, gi.kgFood, gi.userId, gi.createdAt as createdInvite, gi.id as idInvite, 
        u.name as userName, 
        JSON_ARRAYAGG( JSON_OBJECT( 'name', student, 'ra', ra, 'email', studentEmail, 'course', course ) ) as students FROM events_guests as g 
        LEFT join events_guests_invite as gi 
        on gi.emailInvite = g.studentEmail 
        or gi.emailInvite = g.motherEmail 
        or gi.emailInvite = g.fatherEmail 
        LEFT join events_users as u on gi.userId = u.id 
        WHERE mother LIKE ? or father LIKE ? OR student LIKE ? GROUP BY mother LIMIT 10;
        `,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        )

        return res.json(guests)
    }

}