import { type NextFunction, type Request, type Response, Router } from 'express'

import usersRoute from '../app/user/user.route'
import { ERROR_CODE } from '../interface'
import { AppError } from '../middleware'
import { ResponseHandler } from '../utils'

const route = Router()

route.use('/users', usersRoute)

route.get('/', (req: Request, res: Response) => {
	ResponseHandler.ok(res, null, 'Hello World 🌍🚀')
})

route.use('*', (req: Request, res: Response, next: NextFunction) => {
	const error = new AppError(ERROR_CODE.NOT_FOUND.code)
	next(error)
})

export default route
