import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../config/prisma'
import { auth } from '../../../middleware/auth'


export default async function guests(req: NextApiRequest, res: NextApiResponse) {
    //@ts-ignore
    const { unity, profile } = auth(req, res)
    if (req.method === 'GET') {

        if (profile === 'Operador') {
            const guests = await prisma.$queryRawUnsafe(`
                SELECT 
                g.mother, g.motherEmail, g.father, g.fatherEmail, g.unity,
                gi.emailInvite, gi.numberGuests, gi.kgFood, gi.userId, gi.createdAt as createdInvite, gi.updatedAt as updatedInvite, gi.id as idInvite, gi.comments, 
                u.name as userName, 
                JSON_ARRAYAGG( JSON_OBJECT( 'name', student, 'ra', ra, 'email', studentEmail, 'course', course ) ) as students FROM events_guests as g 
                LEFT join events_guests_invite as gi 
                on gi.motherEmail = g.motherEmail      
                LEFT join events_users as u on gi.userId = u.id 
                where g.unity = ?
                GROUP BY mother
                order by mother, student;
                `,
                unity
            )
            // WHERE(mother LIKE ? or father LIKE ?) and g.unity = ?
            // LIMIT 10;

            return res.json(guests)
        }


        const guests = await prisma.$queryRawUnsafe(`
            SELECT 
            g.mother, g.motherEmail, g.father, g.fatherEmail, g.unity,
            gi.emailInvite, gi.numberGuests, gi.kgFood, gi.userId, gi.createdAt as createdInvite, gi.id as idInvite, gi.updatedAt as updatedInvite, gi.comments, 
            u.name as userName, 
            JSON_ARRAYAGG( JSON_OBJECT( 'name', student, 'ra', ra, 'email', studentEmail, 'course', course ) ) as students FROM events_guests as g 
            LEFT join events_guests_invite as gi 
            on gi.motherEmail = g.motherEmail      
            LEFT join events_users as u on gi.userId = u.id 
            GROUP BY mother
            order by mother, student;
            `
        )
        // WHERE mother LIKE ? or father LIKE ? 

        //@ts-ignore
        console.log('guestsLength: ', guests.length)
        return res.json(guests)

    }

}

/**
 * 
 *   SELECT 
        g.mother, g.motherEmail, g.father, g.fatherEmail, 
        gi.emailInvite, gi.numberGuests, gi.kgFood, gi.userId, gi.createdAt as createdInvite, gi.id as idInvite, 
        u.name as userName, 
        JSON_ARRAYAGG( JSON_OBJECT( 'name', student, 'ra', ra, 'email', studentEmail, 'course', course ) ) as students FROM events_guests as g 
        LEFT join events_guests_invite as gi 
        on gi.emailInvite = g.studentEmail 
        or gi.emailInvite = g.motherEmail 
        or gi.emailInvite = g.fatherEmail 
        LEFT join events_users as u on gi.userId = u.id 
        WHERE(mother LIKE ? or father LIKE ? OR student LIKE ?) and g.unity = ?
        GROUP BY mother, student LIMIT 10;
        `,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            unity
        )
 */