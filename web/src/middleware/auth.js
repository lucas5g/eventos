import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {

    const token = req.headers['authorization'];

    // console.log(req.headers)
    if (!token) {
        return res.status(403).json({
            msg: 'A token is required for authentication'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = decoded
        return user

    } catch (err) {
        return res
            .status(401)
            .json({
                msg: "Invalid Token"
            });
        // return next();
    }
}