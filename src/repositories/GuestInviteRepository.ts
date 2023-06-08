import { prisma } from "../libs/prisma";

export class GuestInviteRepository{
  static async findMany(){
    return await prisma.guestInvite.findMany({
      include:{
        user:{
          select:{
            name:true
          }
        }
      }
    })
  }
}