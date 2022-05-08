import { Request, Response } from 'express'
import { prisma } from '../config/prisma'

export class GuestController {
    static async index(req: Request, res: Response) {

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

        res.json(guests)
    }


    static async test(){
        console.log('test')
    }
}