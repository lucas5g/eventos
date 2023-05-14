import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../../utils/auth'
import { GuestService } from '../../../services/GuestService'
import { error } from '../../../utils/error'


export default async function guests(req: NextApiRequest, res: NextApiResponse) {

  try {
    const { unity, profile } = auth(req, res)
    res.json(await GuestService.findMany({ unity, profile }))
  } catch (e) {
    const {status, message} = error(e)
    console.log(message)
    return res.status(status).json(message)
  }
}

