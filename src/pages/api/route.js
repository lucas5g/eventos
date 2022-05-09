import { UserController } from '../../../backend/controllers/UserController'
import { GuestController } from '../../../backend/controllers/GuestController'

export default async function routes(req, res) {

    const { route } = req.query
    const { method } = req

    const controller = route[0]
    const params = route[1]


    if (controller === 'usuarios') {

        console.log({ params })
        if (method === 'GET' && params) {
            UserController.show(req, res)
            return
        }

        if (method === 'GET') {
            UserController.index(req, res)
            return
        }
    }


    if (controller === 'convidados') {


        if (method === 'GET') {
            console.log({ controller, params })
            GuestController.index(req, res)
            return

        }

    }




    res.json({
        msg: 'Route not found',
        route
    })


}