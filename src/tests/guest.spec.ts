import { describe, expect, it } from "vitest";
import { GuestService } from "../services/GuestService";
import { faker } from "@faker-js/faker";

describe('Guest', () => {
  it('list by unity', async () => {
    const guests = await GuestService.findMany({ profile: 'Operador', unity: 'Contagem' }) as any[]
    const guestFirst = guests[0]
    expect(guestFirst).toBe
  })

  it('list all', async () => {
    const guests = await GuestService.findMany({ profile: 'Admin', unity: 'Contagem' }) as any[]
    const guest = guests[0]
    expect(guest).toBe
  })

  it('Create or update', async () => {

    const guest = () => {
      // id: faker.number.int(1000),
      return {

        father: faker.person.fullName(),
        fatherEmail: faker.internet.email(),
        mother: faker.person.fullName(),
        motherEmail: faker.internet.email(),
        student: faker.person.fullName(),
        studentEmail: faker.internet.email(),
        course: `course name`,
        ra: faker.string.alpha({ length: 5 }),
        unity: 'BH',
        alumni: 'no'
      }
    }

    const data = faker.helpers.multiple(guest, {
      count: 1
    })

    const guests = await GuestService.CreateOrUpdate(data)

  })
})