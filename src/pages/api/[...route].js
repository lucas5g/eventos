// import { ResponsibleController } from "../../../backend/controllers/ResponsibleController.mjs"


export default async function routes(req, res) {

    const { route } = req.query
    const { method } = req

    const controller = route[0]
    const params = route[1]

    if (controller === 'responsaveis') {

        if (method === 'GET') {
            // ResponsibleController.index(req, res)
            return

        }

    }




    res.json({
        msg: 'Route not found',
        route
    })


}