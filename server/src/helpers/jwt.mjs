import jwt from 'jsonwebtoken'

export function generateAccessToken({ email }) {
    const token = jwt.sign({
        email,
    }, process.env.TOKEN_SECRET)

    return token
}