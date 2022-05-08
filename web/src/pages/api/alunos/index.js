import { Op } from 'sequelize'
import { Student } from '../../../model/Student';
import { auth } from '../../../middleware/auth'

export default async function students(req, res) {

    const { search } = req.query

    const logged = auth(req, res)
    if (logged.profileId !== 1) {
        return res.status(401)
            .json({
                msg: 'not authorized'
            })
    }

    const students = await Student
        .findAll({
            raw: true,
            limit: 15,
            order: ['name'],
            where: {
                [Op.or]: [{
                        name: {
                            [Op.like]: '%' + search + '%'
                        }
                    },
                    {

                        father: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {

                        mother: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]

            }


        })

    res.json(students)
}