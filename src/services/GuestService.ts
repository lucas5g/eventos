import { z } from "zod"
import { GuestRepository } from "../repositories/GuestRepository"

const schema = z.object({
  profile: z.string(),
  unity: z.string()
})

export class GuestService {
  static async findMany(data: any) {

    schema.parse(data)
    const guests = await GuestRepository.findMany(data) as any[]
    // console.log('guestsLength => ', guests.length)
    return guests
  }
}