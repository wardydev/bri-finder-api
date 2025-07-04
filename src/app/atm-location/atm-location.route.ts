import { Router } from 'express'
import { auth } from 'src/middleware/auth-middleware'

import { catchAsync, compressAndSaveMultipleImage, upload } from '../../utils'

import * as mapLocationController from './atm-location.controller'

const route = Router()

route.post(
	'/',
	auth('ACCESS', ['ADMIN']),
	upload.array('files', 5),
	compressAndSaveMultipleImage,
	catchAsync(mapLocationController.createMapLocation),
)
route.get(
	'/',
	auth('ACCESS', ['ADMIN']),
	catchAsync(mapLocationController.getMapLocations),
)
route.get(
	'/:id',
	auth('ACCESS', ['ADMIN']),
	catchAsync(mapLocationController.getMapLocation),
)
route.patch(
	'/:id',
	auth('ACCESS', ['ADMIN']),
	catchAsync(mapLocationController.updateMapLocation),
)
route.delete(
	'/:id',
	auth('ACCESS', ['ADMIN']),
	catchAsync(mapLocationController.deleteMapLocation),
)

export default route
