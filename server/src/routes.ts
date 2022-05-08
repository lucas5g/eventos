import { Router } from 'express'
import { ResponsibleController } from './controllers/ResponsibleController'
import { StudentController } from './controllers/StudentController'
import { UserController } from './controllers/UserController'
import { AuthController } from './controllers/AuthController'
import { auth, permit } from './middlewares'

export const routes = Router()


/**
 * Auth
 */
routes.post('/auth/login', AuthController.login)
routes.post('/auth/me', auth, AuthController.me)
routes.post('/auth/meAdmin', [auth, permit('Admin')], AuthController.meAdmin)


/**
 * Users
 */
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)

/**
 * Students
 */
// routes.get('/students', StudentController.index)


/**
 *  Responsibles
 */
routes.get('/responsibles', ResponsibleController.index)


