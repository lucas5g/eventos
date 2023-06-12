import { z } from "zod"
import { ReportRepository } from "../repositories/ReportRepository"

const schema = z.object({
  profile: z.string(),
  unity: z.string()
})
export class ReportService {

  static async index(data: any) {
    const { profile, unity } = schema.parse(data)

    if (profile === 'Operador') {
      const reportUnity = await ReportRepository.query(unity)
      return [reportUnity]
    }



    const queryReportBH = await ReportRepository.query('BH')
    const queryReportContagem = await ReportRepository.query('Contagem')
    const queryReportEPSA = await ReportRepository.query('EPSA')    
    const queryReportGutierrez = await ReportRepository.query('Gutierrez')
    const queryReportNovaLima = await ReportRepository.query('NovaLima')
    const queryReportSIC = await ReportRepository.query('SIC')

    //@ts-ignore
    const report = [
      queryReportBH,
      queryReportContagem,
      queryReportEPSA,
      queryReportGutierrez,
      queryReportNovaLima,
      queryReportSIC, 
      {
        sumKgFood: Number(queryReportBH.sumKgFood) + Number(queryReportContagem.sumKgFood) + Number(queryReportNovaLima.sumKgFood) + Number(queryReportGutierrez.sumKgFood),
        sumNumberGuests: Number(queryReportBH.sumNumberGuests) + Number(queryReportContagem.sumNumberGuests) + Number(queryReportNovaLima.sumNumberGuests) + Number(queryReportGutierrez.sumNumberGuests),
        unity: 'Total',
      }
    ]

    return report
  }

}