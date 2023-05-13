import { describe, expect, it} from 'vitest'
import { AuthService } from '../services/AuthService'
describe('Auth', () => {
  it('login wrong invalid', async() => {
    const login = {
      email:'admin@mail.com',
      password: 'qweqwew'
    }
    const userLogged = AuthService.login(login)
    await expect(userLogged).rejects.toThrow('E-mail ou Senha inválidos!')
  })

  it.only('login', async() => {
    const login = {
      email:'seed@mail.com',
      password: 'qweqwe'
    }
    const userLogged = await AuthService.login(login)
    console.log(userLogged)
  })
})