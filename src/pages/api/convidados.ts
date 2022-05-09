import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../config/prisma'
import { auth } from '../../middleware/auth'


export default async function guests(req: NextApiRequest, res: NextApiResponse) {

    auth(req, res)
    if (req.method === 'GET') {
        
        const { search } = req.query
        const guests = await prisma.$queryRawUnsafe(`
            SELECT mother, motherEmail, father, fatherEmail, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'name', student,
                    'ra', ra,
                    'email', studentEmail,
                    'course', course
                )
            ) as students 
            FROM events_guests
            WHERE 
                mother LIKE ? or father LIKE ? OR student LIKE ?
            GROUP BY mother
            LIMIT 10
        `,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        )

        return res.json(guests)
    }

}