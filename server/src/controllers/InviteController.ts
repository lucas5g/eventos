import {Request, Response} from 'express'

export class InviteController {
    static async index(req: Request, res: Response) {

        res.send('enviar convite')
      
    }

    static async show(req: Request, res: Response){
        res.send('show convite')
    }


    static async create(req: Request, res: Response){
        res.send('create convite')
    }


    static async update(req: Request, res: Response){
        res.send('update convite')
    }


}