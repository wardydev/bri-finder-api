import { type Request, type Response, type NextFunction } from 'express'

import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as auhtServices from './auth.service'

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await auhtServices.registerUser(req.body)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, null, 'User berhasil terdaftar')
}

export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await auhtServices.loginUser(req.body)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, null, 'User berhasil terdaftar')
}
