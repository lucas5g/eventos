import { describe, it } from "vitest";
import { GuestInviteService } from "../services/GuestInviteService";

describe('Guest Invite', () => {
  it('list', async () => {
    const guestsInvitations = await GuestInviteService.findMany()
    // console.log(guestsInvitations)
  })

  // it.only('Crud', async () => {
  //   const data = {
  //     emailInvite: "lucas@mail.com",
  //     motherEmail: "lucas@mail.com",
  //     numberGuests: 1,
  //     kgFood: 2,
  //     students: [
  //       "Test1111"
  //     ],
  //     unity: "BH",
  //     "comments": ""
  //   }

  //   const guestInvite = await GuestInviteService.
  // })


})