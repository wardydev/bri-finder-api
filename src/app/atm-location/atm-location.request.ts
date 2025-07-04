import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createMapLocationSchema = Joi.object({
	lng: Joi.number().required().messages(joiGeneralMessage),
	lat: Joi.number().required().messages(joiGeneralMessage),
	bank: Joi.string().required().messages(joiGeneralMessage),
	name: Joi.string().required().messages(joiGeneralMessage),
	address: Joi.string().required().messages(joiGeneralMessage),
	hours: Joi.string().required().messages(joiGeneralMessage),
	images: Joi.array()
		.items(Joi.string())
		.required()
		.messages(joiGeneralMessage),
})
