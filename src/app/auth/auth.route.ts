import { Router } from 'express'
import { validateRequest } from 'src/middleware'

import { catchAsync } from '../../utils'

import * as authController from './auth.controller'
import { loginUserSchema, registerUserSchema } from './auth.request'

const route = Router()

route.post(
	'/register',
	validateRequest(registerUserSchema, 'body'),
	catchAsync(authController.registerUser),
)
route.post(
	'/login',
	validateRequest(loginUserSchema, 'body'),
	catchAsync(authController.loginUser),
)

export default route
