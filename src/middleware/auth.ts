import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export const auth = (req: NextApiRequest, res: NextApiResponse) => {

    //@ts-ignore
    const token = req.headers['authorization'];

    // console.log(req.headers)
    if (!token) {
        return res.status(403).json({
            msg: 'A token is required for authentication'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY || '');

        const user = decoded
        return user
        // return next();

    } catch (err) {
        res
            .status(401)
            .json({
                msg: "Invalid Token"
            });
        return
    }
}

