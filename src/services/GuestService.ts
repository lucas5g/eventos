import { z } from "zod"
import { GuestRepository } from "../repositories/GuestRepository"

const filterSchema = z.object({
  profile: z.string(),
  unity: z.string()
})

const createSchema = z.object({
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

    const guest = createSchema.parse(data)
    return await GuestRepository.CreateOrUpdate(guest)
  }
}