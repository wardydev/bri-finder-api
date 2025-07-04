import bcrypt from 'bcrypt'
import { generateToken } from 'src/utils'

import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import { type User } from '../../prisma/client'

import * as authRepositories from './auth.repository'

export const registerUser = async (
	data: Omit<User, 'createdAt' | 'updatedAt' | 'isActive'>,
) => {
	const existingUser = await authRepositories.getUserByEmail(data.email)
	if (existingUser) {
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Email sudah terdaftar')
	}

	const hashedPassword = await bcrypt.hash(data.password, 10)
	const user = await authRepositories.createUser({
		...data,
		password: hashedPassword,
	})
	return user
}

export const loginUser = async (data: { email: string; password: string }) => {
	const user = await authRepositories.getUserByEmail(data.email)
	if (!user) {
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'User tidak ditemukan')
	}

	const isPasswordValid = await bcrypt.compare(data.password, user.password)
	if (!isPasswordValid) {
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Password salah')
	}

	const token = generateToken({
		email: user.email,
		id: user.id,
		name: user.name,
		role: user.role,
	})

	return token
}
