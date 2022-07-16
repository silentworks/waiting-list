export const withDefault = (prop, original = null) => (prop ? prop : original)

interface ResponseMapper {
	status: string
	message: string
	statusCode: number
}

const responseMapper = (event) => ({
	status: event.status,
	message: event.message,
	statusCode: event.code
})

export interface SuccessMapperResponse<T> extends ResponseMapper {
	data: T
}

export interface ErrorMapperResponse extends ResponseMapper {
	error: {
		message: string
		code: number
	}
}

export function isSuccessResponse<T>(
	response: SuccessMapperResponse<T> | ErrorMapperResponse
): response is SuccessMapperResponse<T> {
	return (response as SuccessMapperResponse<T>) !== undefined
}

export const successMapper = <T>(event): SuccessMapperResponse<T> => ({
	...responseMapper({
		status: 'success',
		message: event.message,
		code: withDefault(event.code, 200)
	}),
	data: withDefault(event.data, [])
})

export const errorMapper = (event): ErrorMapperResponse => ({
	error: withDefault(event.error, {}),
	...responseMapper({
		status: 'failed',
		message: event.message,
		code: withDefault(event.code, 400)
	})
})
