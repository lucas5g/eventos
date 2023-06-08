import { z } from "zod"
import { GuestRepository } from "../repositories/GuestRepository"
import { sleep } from "../helpers"
import { cache } from "../libs/cache"
import { GuestInviteRepository } from "../repositories/GuestInviteRepository"
import { Prisma } from "@prisma/client"

const filterSchema = z.object({
  profile: z.string(),
  unity:  z.enum(['BH', 'Contagem', 'EPSA', 'Gutierrez', 'NovaLima', 'SIC'])
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
const guestsSchema = z.array(createSchema)
export class GuestService {
  static async findMany(data: any) {
    const filter = filterSchema.parse(data)
    const guests = await GuestRepository.findMany(filter)

    const invitations = await GuestInviteRepository.findMany()

    // console.log(guestsInvitations)
    const guestsReduce = guests.reduce((acc, guest) => {
      const key = guest.mother;
      const student = {
        ra: guest.ra,
        name: guest.student,
        email: guest.studentEmail,
        course: guest.course
      }

      if (key in acc) {
        acc[key].students.push(student);
      } else {
        acc[key] = {
          father: guest.father,
          fatherEmail: guest.fatherEmail,
          mother: key,
          motherEmail: guest.motherEmail,
          unity: guest.unity,


          students: [student]
        };
      }
      return acc;
    }, {})

    const guestsValues = Object.values(guestsReduce)
    const guestsInvitations = guestsValues.map((guest: any) => {
      const invite = invitations.find(invite => {
        const students = invite.students as Prisma.JsonArray
        return students.some(ra => guest.students[0].ra === ra)
      })

      return {
        ...guest,
        kgFood: invite?.kgFood,
        comments: invite?.comments,
        createdInvite: invite?.createdAt,
        updatedInvite: invite?.updatedAt,
        emailInvite: invite?.emailInvite ?? null,
        numberGuests: invite?.numberGuests,
        userId: invite?.userId,
        idInvite: invite?.id,
        userName: invite?.user.name

      }
    })

    return guestsInvitations
  }

  static async CreateOrUpdate(data: any) {
    if (cache.has('creatingGuests')) {
      return { message: `Aguarde ${cache.getTtl('creatingGuests')}` }
    }

    cache.flushAll()

    const guests = guestsSchema.parse(data)
    cache.set('creatingGuests', true, guests.length / 100)
    guests.forEach(async (guest: any, index: number) => {
      await GuestRepository.CreateOrUpdate(guests[index])
    })
    return guests
  }
}