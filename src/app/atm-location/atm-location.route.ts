import { Router } from 'express'

import { catchAsync, compressAndSaveMultipleImage, upload } from '../../utils'

import * as mapLocationController from './atm-location.controller'

const route = Router()

route.post(
	'/',
	upload.array('files', 5),
	compressAndSaveMultipleImage,
	catchAsync(mapLocationController.createMapLocation),
)
route.get('/', catchAsync(mapLocationController.getMapLocations))
route.get('/:id', catchAsync(mapLocationController.getMapLocation))
route.patch('/:id', catchAsync(mapLocationController.updateMapLocation))
route.delete('/:id', catchAsync(mapLocationController.deleteMapLocation))

export default route
