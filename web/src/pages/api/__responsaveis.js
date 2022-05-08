import { ResponsibleController } from "../../../backend/controllers/ResponsibleController.mjs"


export default async function routes(req, res) {

    const { routes } = req.query

    console.log(req.query)
    if (req.method === 'GET') {
        ResponsibleController.index(req, res)
        return
    }

    res.json({
        msg: 'auto',
        routes
    })


}