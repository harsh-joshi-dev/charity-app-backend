import dotenv from 'dotenv'
dotenv.config()

import express, { Express, Request, Response } from 'express'
import './database/conn'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routes/index'

import { globalErrorHandler, urlNotFound } from './utils/errorHandler'

const app: Express = express()
const port = process.env.PORT

const corsOptions = { origin: process.env.ALLOW_ORIGIN }
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// log every request to the console
app.use(morgan('dev'))

app.use('/api', routes)

// catch 404 and forward to error handler
app.use(urlNotFound);

// production error handler
// no stacktrace leaked to user
app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});