import { describe, expect, it } from "vitest";
import { GuestService } from "../services/GuestService";
import { faker } from "@faker-js/faker";

describe('Guest', () => {
  it('list by unity', async () => {
    const guests = await GuestService.findMany({ profile: 'Operador', unity: 'Contagem' }) as any[]
   
    guests.slice(0,30).forEach( guest => {
      expect(guest).contain({unity: 'Contagem'})
    })
    
  })

  it('list all', async () => {
    const guests = await GuestService.findMany({ profile: 'Admin', unity: 'Contagem' }) as any


    /**
     * Test employee who has students
     */
    const  guestsFilter = guests.filter( guest => guest.mother.toLowerCase().includes('lidia ferreira jorge'))
    expect(guestsFilter).length.greaterThanOrEqual(2)
    // console.log({guestsFilter})


    const guestFirst = guests[0]

    expect(guestFirst).toHaveProperty('mother')
    expect(guestFirst).toHaveProperty('motherEmail')
    expect(guestFirst).toHaveProperty('father')
    expect(guestFirst).toHaveProperty('fatherEmail')
    expect(guestFirst).toHaveProperty('kgFood')
    expect(guestFirst).toHaveProperty('comments')
    expect(guestFirst).toHaveProperty('createdInvite')
    expect(guestFirst).toHaveProperty('unity')
    expect(guestFirst).toHaveProperty('emailInvite')
    expect(guestFirst).toHaveProperty('numberGuests')
    expect(guestFirst).toHaveProperty('userId')
    expect(guestFirst).toHaveProperty('idInvite')
    expect(guestFirst).toHaveProperty('updatedInvite')
    expect(guestFirst).toHaveProperty('comments')
    expect(guestFirst).toHaveProperty('userName')



    expect(guestFirst.students[0]).toHaveProperty('ra')
    expect(guestFirst.students[0]).toHaveProperty('name')
    expect(guestFirst.students[0]).toHaveProperty('email')
    expect(guestFirst.students[0]).toHaveProperty('course')
    expect(guestFirst.students[0]).toHaveProperty('ra')

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