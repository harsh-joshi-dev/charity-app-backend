import { Router } from 'express'
import { ping } from '../controllers/common.controller'
import { use } from '../helpers/use.helper'

const routes = Router()

routes.get('/', use(ping))

export default routes
