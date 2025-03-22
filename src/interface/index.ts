export type ErrorCode =
	| 'BAD_REQUEST'
	| 'UNAUTHORIZED'
	| 'FORBIDDEN'
	| 'NOT_FOUND'
	| 'METHOD_NOT_ALLOWED'
	| 'INTERNAL_SERVER_ERROR'
	| 'EXTERNAL_API_NOT_FOUND'
	| 'EXTERNAL_API_ERROR'
	| 'TOO_MANY_REQUESTS'
interface ErrorCodeDetail {
	code: ErrorCode
	message: string
	httpStatus: number
}

export type ERROR_CODE_TYPE = Record<string, ErrorCodeDetail>

export const ERROR_CODE: ERROR_CODE_TYPE = {
	BAD_REQUEST: {
		code: 'BAD_REQUEST',
		message: 'Bad Request',
		httpStatus: 400,
	},
	UNAUTHORIZED: {
		code: 'UNAUTHORIZED',
		message: 'Unauthorized',
		httpStatus: 401,
	},
	FORBIDDEN: {
		code: 'FORBIDDEN',
		message: 'Forbidden',
		httpStatus: 403,
	},
	NOT_FOUND: {
		code: 'NOT_FOUND',
		message: 'Not Found',
		httpStatus: 404,
	},
	METHOD_NOT_ALLOWED: {
		code: 'METHOD_NOT_ALLOWED',
		message: 'Method Not Allowed',
		httpStatus: 405,
	},
	INTERNAL_SERVER_ERROR: {
		code: 'INTERNAL_SERVER_ERROR',
		message: 'Internal Server Error',
		httpStatus: 500,
	},
	EXTERNAL_API_NOT_FOUND: {
		code: 'EXTERNAL_API_NOT_FOUND',
		message: 'External API Not Found',
		httpStatus: 404,
	},
	EXTERNAL_API_ERROR: {
		code: 'EXTERNAL_API_ERROR',
		message: 'External API Error',
		httpStatus: 500,
	},
	TOO_MANY_REQUESTS: {
		code: 'TOO_MANY_REQUESTS',
		message: 'Too Many Requests',
		httpStatus: 429,
	},
}

export type ApiStatus = 'success' | 'error'

export interface ApiResponse<T> {
	status: ApiStatus
	data?: T
	error?: {
		code: ErrorCode
		message: string
	}
}

export interface Meta {
	currentPage: number
	totalPages: number
	perPage: number
	totalEntries: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	meta?: Meta
}

export interface QueryParams {
	page?: string
	perPage?: string
	sort?: string
	search?: string
	status?: 'active' | 'inactive'
	divisionId?: string
	activeOnly?: boolean
	date?: string
	month?: string
	year?: string
}

export interface QueryParamsCustomerAddress {
	page?: string
	perPage?: string
	search?: string
	city?: string
	state?: string
	status?: 'active' | 'inactive'
}

export interface QueryParamsUserFilter {
	department?: string
	division?: string
	role?: string
	titleOfDepartment?: string
	titleOfDivision?: string
}

export interface UserQueryParams {
	phoneNumber?: string
	email?: string
}

export interface MulterFile {
	fieldName: string
	originalname: string
	encoding: string
	mimetype: string
	buffer: Buffer
	size: number
}
