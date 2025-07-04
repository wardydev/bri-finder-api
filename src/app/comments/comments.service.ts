import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import { type Comment } from '../../prisma/client'

import * as commentRepositories from './comments.repository'

export const createComment = async (
	data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>,
) => {
	return await commentRepositories.createComment(data)
}

export const updateComment = async (
	id: string,
	data: Partial<Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>>,
) => {
	const comment = await commentRepositories.getComment(id)

	if (!comment)
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Komentar tidak ditemukan')

	return await commentRepositories.updateComment(id, data)
}

export const deleteComment = async (id: string) => {
	const comment = await commentRepositories.getComment(id)

	if (!comment)
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Komentar tidak ditemukan')

	return await commentRepositories.deleteComment(id)
}

export const getComment = async (id: string) => {
	const comment = await commentRepositories.getComment(id)

	if (!comment)
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Komentar tidak ditemukan')

	return comment
}

export const getComments = async () => {
	return await commentRepositories.getComments()
}
