import { prisma } from "../libs/prisma"

export class ReportRepository {
  static async query(unity: string) {
    const result: any[] = await prisma.$queryRawUnsafe(`
      select
      sum(kgFood) as sumKgFood, sum(numberGuests) as sumNumberGuests
      from GuestInvite
      where unity = ?
   `,
      unity
    )
    if(result[0].sumKgFood === null) {
      return {
        sumKgFood:0,
        sumNumberGuests:0,
        unity
      }
    }
    return {...result[0], unity }
  }
}