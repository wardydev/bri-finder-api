import { type NextFunction, type Request, type Response } from 'express'
import jwt, { type Secret } from 'jsonwebtoken'

import { getUserById } from '../app/auth/auth.repository'
import { type UserRole } from '../prisma/client'
import { MESSAGES, ResponseHandler, config } from '../utils'

export interface PayloadAccessToken {
	type: string
	id: string
	name: string
	email: string
	role: UserRole
	iat: number
	exp: number
}

type AuthType = 'AUTH' | 'ACCESS' | 'REFRESH'

const SECRET_KEY: Secret = config.jwt.accessPrivateKey

export interface RequestWithAccessToken extends Request {
	tokenPayload: PayloadAccessToken
	jwtToken: string
	appKey?: string
}

export const auth =
	(type: AuthType, roles: UserRole[]) =>
	async (request: Request, response: Response, next: NextFunction) => {
		if (!type) {
			ResponseHandler.badRequest(next, 'Auth type tidak ditemukan.')
			return
		}
		if (!roles || roles.length === 0) {
			ResponseHandler.badRequest(next, 'Role tidak ditemukan.')
			return
		}
		try {
			const token = request.header('Authorization')?.replace('Bearer ', '')
			if (!token) {
				ResponseHandler.unauthorized(next, 'Token tidak ditemukan.')
				return
			}
			const decoded = jwt.verify(token, SECRET_KEY) as PayloadAccessToken
			if (decoded.type !== type) {
				ResponseHandler.forbidden(next, 'Anda tidak memiliki akses.')
				return
			}
			console.log('Decoded : ', JSON.stringify(decoded, null, 2))

			if (!roles.includes(decoded.role)) {
				ResponseHandler.forbidden(next, 'Anda tidak memiliki akses.')
				return
			}

			if (Object.keys(decoded).length === 0) {
				ResponseHandler.unauthorized(next, 'Token tidak valid.')
			}
			console.log('Decoded Payload:', JSON.stringify(decoded, null, 2))
			if (type === 'ACCESS') {
				;(request as RequestWithAccessToken).tokenPayload = decoded
			}
			const user = await getUserById(Number(decoded.id))
			if (!user) {
				ResponseHandler.forbidden(next, MESSAGES.ERROR.NOT_FOUND.USER)
				return
			}
			next()
		} catch (error) {
			console.error('Error Auth Middleware => ', error)
			ResponseHandler.unauthorized(next, 'Silahkan login terlebih dahulu.')
		}
	}
