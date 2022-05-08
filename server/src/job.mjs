import { StudentController } from './controllers/StudentController.mjs'
import { InviteController } from './controllers/InviteController.mjs'
import { UserController } from './controllers/UserController.mjs'
import { AuthController } from './controllers/AuthController.mjs'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


(async() => {

    AuthController.login()

})()