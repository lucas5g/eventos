import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../config/prisma'
import { auth } from '../../../middleware/auth'


export default async function guestRegister(req: NextApiRequest, res: NextApiResponse) {

    auth(req, res)
    if (req.method === 'POST') {
        
        const { email, numberGuests, students} = req.body
        console.log({email, numberGuests, students})
        res.json({ msg: 'register'})
     
    }

}