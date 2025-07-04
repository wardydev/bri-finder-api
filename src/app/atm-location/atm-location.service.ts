import { type Request } from 'express'

import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import { type AtmLocations } from '../../prisma/client'
import { getFullPath } from '../../utils'

import * as atmLocationRepository from './atm-location.repository'
import { createMapLocationSchema } from './atm-location.request'

export const createMapLocation = async (
	data: Omit<AtmLocations, 'createdAt' | 'updatedAt' | 'id' | 'comments'> & {
		images: string[]
	},
) => {
	const { error, value } = createMapLocationSchema.validate(data)

	if (error) return new AppError(ERROR_CODE.BAD_REQUEST.code, error.message)

	return await atmLocationRepository.createMapLocation({
		...value,
		images: value.images,
	})
}

export const updateMapLocation = async (
	id: string,
	data: Partial<
		Omit<AtmLocations, 'createdAt' | 'updatedAt' | 'id' | 'comments'> & {
			images: string[]
		}
	>,
) => {
	const existingLocation = await atmLocationRepository.getMapLocation(id)
	if (!existingLocation)
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Lokasi tidak ditemukan')
	return await atmLocationRepository.updateMapLocation(id, data)
}

export const deleteMapLocation = async (id: string) => {
	const existingLocation = await atmLocationRepository.getMapLocation(id)
	if (!existingLocation)
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Lokasi tidak ditemukan')
	return await atmLocationRepository.deleteMapLocation(id)
}

export const getMapLocation = async (id: string) => {
	const existingLocation = await atmLocationRepository.getMapLocation(id)
	if (!existingLocation)
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Lokasi tidak ditemukan')
	return existingLocation
}

export const getMapLocations = async (req: Request) => {
	const locations = await atmLocationRepository.getMapLocations()
	return locations.map((location) => ({
		id: location.id,
		lng: location.lng,
		lat: location.lat,
		bank: location.bank,
		name: location.name,
		address: location.address,
		hours: location.hours,
		images: location.images.map((image) => getFullPath(req, image.image_url)),
		comments: location.comments.map((comment) => ({
			author: comment.author,
			date: comment.createdAt,
			text: comment.text,
		})),
	}))
}
