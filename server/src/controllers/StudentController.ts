import { Request, Response } from 'express'

export class StudentController {
    // static async index(req: Request, res: Response) {

    //     const 

    // }

    //     console.log(req.query)
    //     const { search } = req.query

    //     if (!search) {
    //         const students = await Student
    //             .findAll({
    //                 raw: true,
    //                 limit: 30,
    //                 order: ['name']
    //             })

    //         return students
    //     }

    //     const students = await Student.findAll({
    //         raw: true,
    //         limit: 20,
    //         order: ['name'],
    //         where: {
    //             [Op.or]: [{
    //                     name: {
    //                         [Op.like]: '%' + search + '%'
    //                     }
    //                 },
    //                 {

    //                     father: {
    //                         [Op.like]: '%' + search + '%'
    //                     },
    //                 },
    //                 {

    //                     mother: {
    //                         [Op.like]: '%' + search + '%'
    //                     }
    //                 }
    //             ]

    //         }


    //     })

    //     res.json(students)
    // }

    // static async test(req, res) {
    //     const students = await Student.findAll({
    //         raw: true,
    //         limit: 15
    //     })

    //     console.log(students)
    // }
}