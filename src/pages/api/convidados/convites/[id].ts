import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../libs/prisma";
import { auth } from "../../../../utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    auth(req, res)
    const {id} = req.query 

    // const infoInvite = await prisma.guestInvite.findFirst({
    //     where:{
    //         id: Number(req.query.id)
    //     }
    // })

    const queryRaw:[0] = await prisma.$queryRawUnsafe(`
        SELECT 
        g.mother, g.motherEmail, g.father, g.fatherEmail, g.unity,
        gi.emailInvite, gi.numberGuests, gi.kgFood, gi.userId, gi.createdAt as createdInvite, gi.id as idInvite, gi.comments, 
        u.name as userName, 
        JSON_ARRAYAGG( JSON_OBJECT( 'name', student, 'ra', ra, 'email', studentEmail, 'course', course ) ) as students FROM events_guests as g 
        LEFT join events_guests_invite as gi 
        on gi.motherEmail = g.motherEmail      
        LEFT join events_users as u on gi.userId = u.id 
        WHERE gi.id = ?
        GROUP BY mother
        order by mother, student
        LIMIT 10;
    `,
        id
    )
    // console.log(queryRaw)
    const infoInvite = queryRaw[0]
    res.json(infoInvite)

}