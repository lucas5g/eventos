import { prisma } from "../libs/prisma";

export class UserRepository{
  static async findByEmail(email:string){
    return await prisma.user.findUnique({
      where:{
        email
      }
    })
  }
}