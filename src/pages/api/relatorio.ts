import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../config/prisma'
import { auth } from '../../middleware/auth'

export default async function report(req: NextApiRequest, res: NextApiResponse) {

    //@ts-ignore
    const {unity, profile} = auth(req, res)

    console.log({unity})
    if(profile === 'Operador'){

        const queryReportUnity = await queryReport(unity)
        return res.json([queryReportUnity])
    }



    const queryReportBH = await  queryReport('BH')
    const queryReportContagem = await  queryReport('Contagem')
    const queryReportNovaLima = await  queryReport('NovaLima')
    const queryReportGutierrez = await  queryReport('Gutierrez')
    
    //@ts-ignore
    const report = [ 
        queryReportBH, 
        queryReportContagem,
        queryReportNovaLima,
        queryReportGutierrez,
        {
            sumKgFood: queryReportBH.sumKgFood + queryReportContagem.sumKgFood + queryReportNovaLima.sumKgFood + queryReportGutierrez.sumKgFood,
            sumNumberGuests: queryReportBH.sumNumberGuests + queryReportContagem.sumNumberGuests + queryReportNovaLima.sumNumberGuests + queryReportGutierrez.sumNumberGuests,
            unity:'Total',
        }
    ]

    res.json(report)
}



async function queryReport(unity: string) {
    const result:[] = await prisma.$queryRawUnsafe(`
        select
        sum(kgFood) as sumKgFood, sum(numberGuests) as sumNumberGuests
        from events_guests_invite
        where unity = ?
    `,
    unity
    )
    console.log(result)
    //@ts-ignore 
    return {...result[0], unity}
}