import { StudentController } from './controllers/StudentController.mjs'
import { InviteController } from './controllers/InviteController.mjs'
import { UserController } from './controllers/UserController.mjs'
import { AuthController } from './controllers/AuthController.mjs'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


(async() => {

    AuthController.login()
        // StudentController.test()
        // UserController.index()
        // console.log(InviteController.index())
        // const token = jwt.sign({
        //     email: 'lucas@mail.com'
        // }, process.env.TOKEN_SECRET)

    // const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    // console.log({
    //     token,
    //     decoded

    // })

    // console.log(process.env.TOKEN_SECRET)

})()