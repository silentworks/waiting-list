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

export const suiteRun = (suite, data) => {
	suite(data)
	const result = suite.get()
	if (result.isValid()) {
		return true
	}
	return formatErrors(result.getErrors())
}

function hashToObject(entries) {
	const result = {}
	for (const [key, value] of entries) {
		result[key] = value
	}
	return result
}

/**
 * @typedef {Object} SupabaseDeepLink
 * @property {string} access_token
 * @property {string} expires_in
 * @property {string} refresh_token
 * @property {string} token_type
 * @property {string} type
 */
/**
 * @return {SupabaseDeepLink}
 */
export const parsedParams = (hash) => {
	const params = new URLSearchParams(hash.replace('#', ''))
	return hashToObject(params)
}
