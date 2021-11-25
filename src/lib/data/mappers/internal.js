export const withDefault = (prop, original = null) => (prop ? prop : original);

const responseMapper = (event) => ({
	status: event.status,
	message: event.message,
	statusCode: event.code
});

export const successMapper = (event) => ({
	...responseMapper({
		status: 'success',
		message: event.message,
		code: withDefault(event.code, 200)
	}),
	data: withDefault(event.data, [])
});

export const errorMapper = (event) => ({
	error: withDefault(event.error, {}),
	...responseMapper({
		status: 'failed',
		message: event.message,
		code: withDefault(event.code, 400)
	})
});
