import { type NextFunction, type Request, type Response, Router } from 'express'

import mapLocationRoute from '../app/atm-location/atm-location.route'
import authRoute from '../app/auth/auth.route'
import commentRoute from '../app/comments/comments.route'
import uploadRoute from '../app/upload-fs/upload-fs.routes'
import { ERROR_CODE } from '../interface'
import { AppError } from '../middleware'
import { ResponseHandler } from '../utils'

const route = Router()

route.use('/auth', authRoute)
route.use('/upload', uploadRoute)
route.use('/map-location', mapLocationRoute)
route.use('/comment', commentRoute)

route.get('/', (req: Request, res: Response) => {
	ResponseHandler.ok(res, null, 'Hello World 🌍🚀')
})

route.use('*', (req: Request, res: Response, next: NextFunction) => {
	const error = new AppError(ERROR_CODE.NOT_FOUND.code)
	next(error)
})

export default route
