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
      console.log(message)
      return res.status(status).json(message)
    }
  }

  if(req.method === 'POST'){
    try{
      return res.status(201).json(await GuestService.CreateOrUpdate(req.body))
    }catch(e){
      const { status, message} = error(e)
      return res.status(status).json(message)
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