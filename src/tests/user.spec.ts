import { describe, expect, it } from "vitest";
import { UserService } from "../services/UserService";

describe('User', () => {
  it('list', async() => {
    const users = await UserService.findMany()
    expect(users[0]).not.toHaveProperty('password')
    expect(users[0]).toHaveProperty('name')
  })

  it('Find by id', async() => {
    const user = await UserService.findById(2)
    expect(user).not.toHaveProperty('password')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('id', 2)
  })

  it('update', async() => {
    const data = {
      name:`name ${new Date().getMinutes()}`,
      email: 'seed@mail.com',
      unity: 'Contagem', 
      profile: 'Admin',
      password:'qweqwe'
    }
    const user = await UserService.update(2, data )
    expect(user).toContain({name: data.name})
  })

  it('create and delete user', async() => {

    const data = {
      name:`name ${new Date().getMinutes()}`,
      email: 'delete@mail.com',
      unity: 'Contagem', 
      profile: 'Admin',
      password:'qweqwe'
    }

    const user = await UserService.create(data)
    delete data.password    
    expect(user).toContain(data)

    const userDelete = await UserService.delete(user.id)
    expect(userDelete).toContain(userDelete)
  })
})