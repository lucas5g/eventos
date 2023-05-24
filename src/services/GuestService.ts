import { z } from "zod"
import { GuestRepository } from "../repositories/GuestRepository"
import { sleep } from "../helpers"
import { cache } from "../libs/cache"

const filterSchema = z.object({
  profile: z.string(),
  unity: z.string()
})

export const createSchema = z.object({
  father: z.string(),
  fatherEmail: z.string().email(),
  mother: z.string(),
  motherEmail: z.string().email(),
  student: z.string(),
  studentEmail: z.string().email(),
  course: z.string(),
  ra: z.string(),
  unity: z.enum(['BH', 'Contagem', 'EPSA', 'Gutierrez', 'NovaLima', 'SIC']),
  alumni: z.enum(['yes', 'no'])
})

export class GuestService {
  static async findMany(data: any) {
    filterSchema.parse(data)
    return await GuestRepository.findMany(data) as any[]
  }

  static async CreateOrUpdate(data: any) {
    cache.flushAll()
    const guests = []
    data.forEach(async(guest:any, index:number) => {
      guests[index] = createSchema.parse(guest)
      await sleep(index * 100)
      await GuestRepository.CreateOrUpdate(guests[index])
    })
    await sleep(data.length * 100)
    return guests

  }
}