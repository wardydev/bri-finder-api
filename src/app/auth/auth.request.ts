import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const registerUserSchema = Joi.object({
	name: Joi.string().required().messages(joiGeneralMessage),
	email: Joi.string().email().required().messages(joiGeneralMessage),
	password: Joi.string().required().min(6).messages({
		'string.min': 'Password minimal 6 karakter',
		'any.required': 'Password harus diisi',
	}),
})

export const loginUserSchema = Joi.object({
	email: Joi.string().email().required().messages(joiGeneralMessage),
	password: Joi.string().required().min(6).messages({
		'string.min': 'Password minimal 6 karakter',
		'any.required': 'Password harus diisi',
	}),
})
