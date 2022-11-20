import type { Suite } from 'vest'

export const formatErrors = (errors: Record<string, string[]>) => {
	const formattedErrors: Record<string, string> = {}
	for (const err in errors) {
		const errVal = errors[err]
		if (errVal.length > 0) {
			formattedErrors[err] = errVal[0]
		}
	}
	return formattedErrors
}

export const suiteRun = <T>(suite: Suite<(data: T) => void>, data: T) => {
	const result = suite(data)
	if (result.isValid()) {
		return true
	}
	return formatErrors(result.getErrors())
}
