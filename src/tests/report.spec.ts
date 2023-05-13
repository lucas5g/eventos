import { describe, expect, it } from "vitest";
import { ReportService } from "../services/ReportService";

describe('Report', () => {
  it('Return data report', async () => {
    const report = await ReportService.index({ profile: 'Operador', unity: 'Contagem' })
    expect(report[0]).toHaveProperty('sumKgFood')
    expect(report[0]).toHaveProperty('sumNumberGuests')
    expect(report[0]).toHaveProperty('unity')
  })

  it('Return data report admin', async () => {
    const unities = [
      'BH',
      'Contagem',
      'EPSA',
      'Gutierrez',
      'NovaLima',
      'SIC'
    ]
    const reports = await ReportService.index({ profile: 'Admin', unity: 'Contagem' }) as any

    unities.forEach((unity, index) => {
      expect(reports[index]).toContain({unity})
    })

    const report = reports[0]
    expect(report).toHaveProperty('sumKgFood')
    expect(report).toHaveProperty('sumNumberGuests')
    expect(report).toHaveProperty('unity')

  })
})
