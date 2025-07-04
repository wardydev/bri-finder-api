import { type Comment, PrismaClient } from '../../prisma/client'

const db = new PrismaClient()

export const createComment = async (
	data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>,
) => {
	return db.comment.create({
		data,
	})
}

export const updateComment = async (
	id: string,
	data: Partial<Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>>,
) => {
	return db.comment.update({
		where: { id },
		data,
	})
}

export const deleteComment = async (id: string) => {
	return db.comment.delete({
		where: { id },
	})
}

export const getComment = async (id: string) => {
	return db.comment.findUnique({
		where: { id },
	})
}

export const getComments = async () => {
	return db.comment.findMany()
}
