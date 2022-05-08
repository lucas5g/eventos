import express from 'express'
import { UserController } from './controllers/UserController'
const app = express()

import { routes } from './routes'
// readExcel()



app.use(express.json())
app.use('/api', routes)


app.listen(process.env.PORT || 8000, (() => console.log(`Server run http://localhost:8000`)))