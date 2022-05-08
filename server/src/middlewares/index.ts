import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['authorization'];

    // console.log(req.headers)
    if (!token) {
        return res.status(403).json({
            msg: 'A token is required for authentication'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY || '');
        //@ts-ignore
        req.auth = decoded
        // return user
        return next();

    } catch (err) {
        res
            .status(401)
            .json({
                msg: "Invalid Token"
            });
        return
    }
}

//@ts-ignore
export function permit(profile: string) {

    return (req: Request, res: Response, next: NextFunction) => {
        //@ts-ignore
        const { auth } = req
        console.log({ auth, profile})
        if (auth && auth.profile === profile) {
            next()
        } else {
            res.status(403).json({ message: "Forbidden" }); // user is forbidden
        }

    }
}