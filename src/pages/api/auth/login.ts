import { NextApiRequest, NextApiResponse } from 'next'
import { AuthService } from '../../../services/AuthService'
import { error } from '../../../utils/error'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try{
    res.json(await AuthService.login(req.body))
  }catch(e){
    const {status, message} = error(e)    
    res.status(status).json({message})
  }
}
   
    

