import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { env } from './env'

export const auth = (req: NextApiRequest, res: NextApiResponse) => {

  //@ts-ignore
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]


  // console.log(req.headers)
  if (!token) {
    return res.status(403).json({
      message: 'A token is required for authentication'
    })
  }
  try {
    const user = jwt.verify(token, env.JWT_TOKEN);
    return user

  } catch (err) {
    res
      .status(401)
      .json({
        message: "Invalid Token"
      });
    return
  }
}

