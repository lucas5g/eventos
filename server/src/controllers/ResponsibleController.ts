import { Request, Response } from 'express'
import { prisma } from '../config/prisma'

export class ResponsibleController {
    static async index(req: Request, res: Response) {

        const { search } = req.query
        const responsibles = await prisma.$queryRawUnsafe(`
            SELECT mother, motherEmail, father, fatherEmail, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'name', student,
                    'ra', ra,
                    'email', studentEmail
                )
            ) as students 
            FROM events_responsibles
            WHERE 
                mother LIKE ? or father LIKE ? OR student LIKE ?
            GROUP BY mother;
        `,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`           
        )

        res.json(responsibles)
    }
}