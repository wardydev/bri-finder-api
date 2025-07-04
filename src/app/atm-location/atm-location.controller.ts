import { type Request, type Response, type NextFunction } from 'express'

import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as atmLocationServices from './atm-location.service'

export const createMapLocation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { filenames, ...rest } = req.body
	const result = await atmLocationServices.createMapLocation({
		...rest,
		images: filenames,
	})
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, null, 'Lokasi berhasil dibuat')
}

export const updateMapLocation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await atmLocationServices.updateMapLocation(
		req.params.id,
		req.body,
	)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, null, 'Lokasi berhasil diupdate')
}

export const deleteMapLocation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await atmLocationServices.deleteMapLocation(req.params.id)
	if (result instanceof AppError) {
		next(result)
		return
	}

	return ResponseHandler.ok(res, null, 'Lokasi berhasil dihapus')
}

export const getMapLocation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await atmLocationServices.getMapLocation(req.params.id)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, result, 'Lokasi berhasil ditemukan')
}

export const getMapLocations = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await atmLocationServices.getMapLocations(req)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, result, 'Lokasi berhasil ditemukan')
}
