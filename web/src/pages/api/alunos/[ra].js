// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Student } from '../../../model/Student'

export default async function studentId(req, res) {

    const { ra } = req.query
    const student = await Student
        .findOne({
            where: { ra }
        })

    if (!student) {
        return res
            .status(404)
            .json({
                msg: 'Student not found'
            })
    }

    if (req.method === 'GET') {
        return res.json(student)
    }


    if (req.method === 'PUT') {

        const update = await Student
            .update(req.body, {
                where: { ra }
            })


        return res
            .json(update)

    }
    return res
        .status(401)
        .json({
            msg: 'Method not allowed'
        })

}