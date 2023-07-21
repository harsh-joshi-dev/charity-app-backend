import { Router } from 'express'
import commonRoutes from './common.routes'

const routes = Router()


routes.use('/ping', commonRoutes)

export default routes
