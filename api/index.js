require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5010
const employeesRouter = require('./routes/employees')
const db = mongoose.connection

app.use(express.json())
app.use(cors())

app.use('/employees', employeesRouter)

mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
mongoose.set('strictQuery', true);

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))