import { prisma } from "../libs/prisma";

export class GuestRepository {
  static async findMany({profile, unity}:{profile?:string, unity?:"BH" | "Contagem" | "EPSA" | "Gutierrez" | "NovaLima" | "SIC"}) {
    if(profile === 'Admin'){
      return await prisma.guest.findMany({ })    
    }
    return await prisma.guest.findMany({
      where:{
        unity
      }
    })

  }

  static async CreateOrUpdate(data?:any){
    return await prisma.guest.upsert({
      where:{
        ra: data.ra,
      }, 
      update:data,
      create:data
    })
  }
}