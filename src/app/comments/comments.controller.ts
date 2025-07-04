import { type Request, type Response, type NextFunction } from 'express'

import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as commentServices from './comments.service'

export const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await commentServices.createComment(req.body)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, null, 'Komentar berhasil dibuat')
}

export const updateComment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await commentServices.updateComment(req.params.id, req.body)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, null, 'Komentar berhasil diperbarui')
}

export const deleteComment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await commentServices.deleteComment(req.params.id)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, null, 'Komentar berhasil dihapus')
}

export const getComment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await commentServices.getComment(req.params.id)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, result, 'Detail komentar berhasil diambil')
}

export const getComments = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await commentServices.getComments()
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, result, 'Komentar lists berhasil diambil')
}
