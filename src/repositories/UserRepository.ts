import { prisma } from "../libs/prisma";

const select = {
  id:true,
  name:true,
  email:true, 
  unity:true,
  profile:true
}
export class UserRepository{
  

  static async findMany(){
    return await prisma.user.findMany({
      select
    })
  }

  static async findById(id:number){
    return  await prisma.user.findUnique({
      where: { id },
      select
    })
  }

  static async update(id:number, data:any){
    return await prisma.user.update({
      where:{id},
      data,
      select
    })
  }

  static async delete(id:number){
    return await prisma.user.delete({
      where:{id}
    })
  }

  static async create(data:any){
    return await prisma.user.create({
      data, 
      select
    })
  }

  static async findByEmail(email:string){
    return await prisma.user.findUnique({
      where:{
        email
      }
    })
  }
}