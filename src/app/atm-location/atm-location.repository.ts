import { type AtmLocations, PrismaClient } from '../../prisma/client'

const db = new PrismaClient()

export const createMapLocation = async (
	data: Omit<AtmLocations, 'createdAt' | 'updatedAt' | 'id' | 'comments'> & {
		images: string[]
	},
) => {
	return db.atmLocations.create({
		data: {
			...data,
			images: {
				create: data.images.map((image: string) => ({ image_url: image })),
			},
		},
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
	return db.atmLocations.update({
		where: { id },
		data: {
			...data,
			images: data.images?.length
				? {
						deleteMany: {},
						create: data.images.map((image: string) => ({ image_url: image })),
					}
				: undefined,
		},
	})
}

export const deleteMapLocation = async (id: string) => {
	return db.atmLocations.delete({
		where: { id },
	})
}

export const getMapLocation = async (id: string) => {
	return db.atmLocations.findUnique({
		where: { id },
		include: {
			images: true,
		},
	})
}

export const getMapLocations = async () => {
	return db.atmLocations.findMany({
		include: {
			images: true,
			comments: true,
		},
	})
}
