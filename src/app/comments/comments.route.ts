import { Router } from 'express'
import { validateRequest } from 'src/middleware'

import { catchAsync } from '../../utils'

import * as commentController from './comments.controller'
import { createCommentSchema, updateCommentSchema } from './comments.dto'

const route = Router()

route.post(
	'/',
	validateRequest(createCommentSchema, 'body'),
	catchAsync(commentController.createComment),
)
route.get('/', catchAsync(commentController.getComments))
route.get('/:id', catchAsync(commentController.getComment))
route.patch(
	'/:id',
	validateRequest(updateCommentSchema, 'body'),
	catchAsync(commentController.updateComment),
)
route.delete('/:id', catchAsync(commentController.deleteComment))

export default route
