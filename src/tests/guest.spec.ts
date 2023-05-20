import { describe, expect, it } from "vitest";
import { GuestService } from "../services/GuestService";

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

  it('Create or update', async() => {
    const data = {
      father: "Lucas de sousa pai",
      fatherEmail: "lucaspai@mail.com",
      mother: "luana de sousa",
      motherEmail: "lucas@mail.com",
      student: "Lucas de sousa Assunção",
      studentEmail: "lucas@mail.com",
      course: "M3BFM",
      ra: "Test1111",
      unity: "BH",
      alumni: "no"
    }

    const guest = await GuestService.CreateOrUpdate(data)
    expect(guest).contain({
      course: data.course,
      ra: data.ra
    })
  })
})