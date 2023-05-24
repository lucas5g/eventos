import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../../utils/auth'
import { GuestService } from '../../../services/GuestService'
import { error } from '../../../utils/error'


export default async function guests(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {

    try {
      const { unity, profile } = auth(req, res)
      return res.json(await GuestService.findMany({ unity, profile }))

    } catch (e) {
      const { status, message } = error(e)
      console.log(e)
      return res.status(status).json(message)
    }
  }

  if(req.method === 'POST'){
    try{
      return res.status(201).json(await GuestService.CreateOrUpdate(req.body))
    }catch(e){
      console.log(e.issues[0])
      // const { status, message} = error(e)
      const error = e.issues[0]
      const message = `
      Ajuste os campos da planilha 
      Linha: ${error.path[0] + 2}
      Erro: ${error.path[1]}: ${[error.message]}
      `
      return res.status(400).json({message})
    }
  }
}

export const config = {
  api:{
    bodyParser:{
      sizeLimit: '2mb'
    }
  }
}