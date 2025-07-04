import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createCommentSchema = Joi.object({
	author: Joi.number().required().messages(joiGeneralMessage),
	text: Joi.string().required().messages(joiGeneralMessage),
	atm_locationId: Joi.string().required().messages(joiGeneralMessage),
})

export const updateCommentSchema = Joi.object({
	author: Joi.number().optional().messages(joiGeneralMessage),
	text: Joi.string().optional().messages(joiGeneralMessage),
	atm_locationId: Joi.string().optional().messages(joiGeneralMessage),
})
