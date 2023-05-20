import { cache } from "../libs/cache";
import { prisma } from "../libs/prisma";

export class GuestRepository {
  static async findMany({profile, unity}:{profile:string, unity:string}) {
    if (profile === 'Operador') {
      if(cache.has('guestsOperator')){
        return cache.get('guestsOperator')
      }
      const guests = await prisma.$queryRawUnsafe(`
        SELECT 
        g.mother, g.motherEmail, g.father, g.fatherEmail, g.unity,
        gi.emailInvite, gi.numberGuests, gi.kgFood, gi.userId, gi.createdAt as createdInvite, gi.updatedAt as updatedInvite, gi.id as idInvite, gi.comments, 
        u.name as userName, 
        JSON_ARRAYAGG( JSON_OBJECT( 'name', student, 'ra', ra, 'email', studentEmail, 'course', course ) ) as students FROM Guest as g 
        LEFT join GuestInvite as gi 
        on gi.motherEmail = g.motherEmail      
        LEFT join User as u on gi.userId = u.id 
        where g.unity = ?
        GROUP BY mother
        order by mother, student;
        `,
        unity
      )
      cache.set('guestsOperator', guests)
      return guests
    }

    if(cache.get('guests')){
      return cache.get('guests')
    }
    const guests =  await prisma.$queryRawUnsafe(`
      SELECT 
      g.mother, g.motherEmail, g.father, g.fatherEmail, g.unity,
      gi.emailInvite, gi.numberGuests, gi.kgFood, gi.userId, gi.createdAt as createdInvite, gi.id as idInvite, gi.updatedAt as updatedInvite, gi.comments, 
      u.name as userName, 
      JSON_ARRAYAGG( JSON_OBJECT( 'name', student, 'ra', ra, 'email', studentEmail, 'course', course ) ) as students FROM Guest as g 
      LEFT join GuestInvite as gi 
      on gi.motherEmail = g.motherEmail      
      LEFT join User as u on gi.userId = u.id 
      GROUP BY mother
      order by mother, student;
    `
    )
    cache.set('guests', guests)
    return guests

  }

  static async CreateOrUpdate(data:any){
    return await prisma.guest.upsert({
      where:{
        ra: data.ra,
      }, 
      update:data,
      create:data
    })
  }
}