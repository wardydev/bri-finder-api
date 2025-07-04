import { PrismaClient, type User } from '../../prisma/client'
const db = new PrismaClient()

export const getUserByEmail = async (email: string) => {
	return db.user.findUnique({
		where: {
			email,
		},
	})
}

export const getUserById = async (id: number) => {
	return db.user.findUnique({
		where: {
			id,
		},
	})
}

export const createUser = async (
	data: Omit<User, 'createdAt' | 'updatedAt' | 'isActive'>,
) => {
	return db.user.create({ data })
}
