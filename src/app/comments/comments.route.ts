import { Router } from 'express'
import { validateRequest } from 'src/middleware'
import { auth } from 'src/middleware/auth-middleware'

import { catchAsync } from '../../utils'

import * as commentController from './comments.controller'
import { createCommentSchema, updateCommentSchema } from './comments.dto'

const route = Router()

route.post(
	'/',
	auth('ACCESS', ['USER']),
	validateRequest(createCommentSchema, 'body'),
	catchAsync(commentController.createComment),
)
route.get(
	'/',
	auth('ACCESS', ['USER']),
	catchAsync(commentController.getComments),
)
route.get(
	'/:id',
	auth('ACCESS', ['USER']),
	catchAsync(commentController.getComment),
)
route.patch(
	'/:id',
	auth('ACCESS', ['USER']),
	validateRequest(updateCommentSchema, 'body'),
	catchAsync(commentController.updateComment),
)
route.delete(
	'/:id',
	auth('ACCESS', ['USER']),
	catchAsync(commentController.deleteComment),
)

export default route
