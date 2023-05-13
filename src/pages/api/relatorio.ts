import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../utils/auth'
import { ReportService } from '../../services/ReportService'

export default async function report(req: NextApiRequest, res: NextApiResponse) {
  //@ts-ignore
  const { unity, profile } = auth(req, res)
  res.json(await ReportService.index({unity, profile}))
}