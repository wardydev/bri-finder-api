import jwt from 'jsonwebtoken'

import { type UserRole } from '../prisma/client'

import { config } from './config'

export const generateToken = (user: {
	id: number
	name: string
	email: string
	role: UserRole
}) => {
	const secret = config.jwt.accessPrivateKey
	const expiresIn = 60 * 60 * config.jwt.expHour
	const payload = {
		type: 'ACCESS',
		userId: user.id,
		email: user.email,
		name: user.name,
		roles: [user.role],
	}
	return jwt.sign(payload, secret, { expiresIn })
}
