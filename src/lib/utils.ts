import type { Suite } from 'vest'

export const formatErrors = (errors) => {
	let formattedErrors = {}
	for (const err in errors) {
		const errVal = errors[err]
		if (errVal.length > 0) {
			formattedErrors[err] = errVal[0]
		}
	}
	return formattedErrors
}

export const suiteRun = (suite: Suite, data: any) => {
	suite(data)
	const result = suite.get()
	if (result.isValid()) {
		return true
	}
	return formatErrors(result.getErrors())
}
