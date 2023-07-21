import { prepareErrorResponse } from './responseHandler'
import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500
  const exitCode = error.exitCode || 100
  const message = error?.message || 'Something went wrong!'
  return res.status(status).json(prepareErrorResponse(exitCode, message))
}

const urlNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('404 Error: The API endpoint you are trying to access does not exist.')
  error.statusCode = 404
  error.exitCode = 99
  next(error)
}

export {
  globalErrorHandler,
  urlNotFound
}

