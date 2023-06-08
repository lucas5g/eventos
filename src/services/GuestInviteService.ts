import { GuestInviteRepository } from "../repositories/GuestInviteRepository";

export class GuestInviteService{
  static async findMany(){
    return await GuestInviteRepository.findMany()
  }
}