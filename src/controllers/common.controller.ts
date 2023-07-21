import { Request, Response } from 'express'
import { prepareSuccessResponse } from '../utils/responseHandler'

export const ping = async (req: Request, res: Response) => {
  return res.status(200).json(prepareSuccessResponse({}, 'Server successfully up and running'))
}