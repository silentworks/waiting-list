interface ResponseMapper {
	status: string
	message: string
	statusCode: number
}

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

export const withDefault = <T, OT>(prop: T, original: OT) => (prop ? prop : original)

interface ResponseEvent {
	status: string
	message: string
	code: number
}

const responseMapper = (event: ResponseEvent) => ({
	status: event.status,
	message: event.message,
	statusCode: event.code
})

interface SuccessEvent {
	message: string
	code: number
	data: any
}

export const successMapper = <T>(event: SuccessEvent): SuccessMapperResponse<T> => ({
	...responseMapper({
		status: 'success',
		message: event.message,
		code: withDefault<number, number>(event.code, 200)
	}),
	data: withDefault<any, []>(event.data, [])
})

interface ErrorEvent {
	message: string
	code: number
	error: any
}

export const errorMapper = (event: ErrorEvent) => ({
	error: withDefault<any, {}>(event.error, {}),
	...responseMapper({
		status: 'failed',
		message: event.message,
		code: withDefault(event.code, 400)
	})
})
