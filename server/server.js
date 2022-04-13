const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const fs = require('fs')
const globalErrorHandler = require('./controllers/errorController')
process.on('uncaughtException', err => {
    console.log(`${err.stack}`)
    console.log("UnCaught Exception! 💥 Shutting Down......")
    process.exit(1)
})


dotenv.config({ path: './config.env' })

//app
const app = express()

//db
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)
mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!', ` Node Environment--->${process.env.NODE_ENV}`))
    .catch((err) => { console.log(`DATABASE ERROR ${err}`) })

//middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json({ limit: '2mb' }))
app.use(cors())


//routes middleware
// app.use('/api/v1/users',userRoutes)
fs.readdirSync('./routes').map((file) => {
    if (file === 'categoryRoutes.js')
        app.use(`/api/v1/categories`, require('./routes/categoryRoutes'))
    else if (file === 'subCategoryRoutes.js')
        app.use(`/api/v1/subCategories`, require('./routes/subCategoryRoutes'))
    else app.use(`/api/v1/${file.replace('Routes.js', '')}s`, require(`./routes/${file}`))
})
app.use(globalErrorHandler)

const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
process.on('unhandledRejection', err => {
    console.log("Unhandled Rejection! 💥 Shutting Down......")
    console.log(`${err.name}::: ${err.message}:::${err}`)
    server.close(() => {
        process.exit(1)
    })
})
