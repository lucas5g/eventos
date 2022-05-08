import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', routes)

app.get('/', (req, res) => {
    res.json({
        api: 'Api de eventos'
    })
})


app.listen(process.env.PORT || 8000, (() => console.log(`Server run http://localhost:8000`)))