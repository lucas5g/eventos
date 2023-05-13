import { describe, it } from "vitest";
import { GuestService } from "../services/GuestService";

describe('Guest', () => {
  it('list by unity', async() => {
    const guests = await GuestService.findMany({profile:'Operador', unity:'Contagem'}) as any[]
    const guestFirst = guests[0]
    console.log(guestFirst)
  })

  it.only('list all', async() => {
    const guests = await GuestService.findMany({profile:'Operador', unity:'BH'}) as any[]
    const guest = guests[0]
    console.log(guest)
  })

})