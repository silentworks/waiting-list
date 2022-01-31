import vest, { test, enforce, skipWhen } from 'vest'
import isEmail from 'pragmatic-email-regex'
import { suiteRun } from '$lib/utils'

enforce.extend({ isEmail })

const emailValidation = (data) => {
	test('email', 'Email is required', () => {
		enforce(data.email).isString().isNotEmpty()
	})

	test('email', 'Email Address is not valid', () => {
		enforce(data.email).isEmail()
	})
}

const passwordValidation = (data) => {
	test('password', 'Password is required', () => {
		enforce(data.password).isString().isNotEmpty()
	})

	test('password', 'Password must be at least 6 characters', () => {
		enforce(data.password).longerThanOrEquals(6)
	})
}

const forgotPasswordSuite = vest.create((data) => {
	emailValidation(data)
})

const signInSuite = vest.create((data) => {
	emailValidation(data)
	passwordValidation(data)
})

const signUpSuite = vest.create((data) => {
	emailValidation(data)
	passwordValidation(data)

	test('fullName', 'Full Name is required', () => {
		enforce(data.fullName).isString().isNotEmpty()
	})
})

const waitingListSuite = vest.create((data) => {
	emailValidation(data)

	test('fullName', 'Full Name is required', () => {
		enforce(data.fullName).isString().isNotEmpty()
	})
})

const resetPasswordSuite = vest.create((data) => {
	passwordValidation(data)

	skipWhen(!data.password, () => {
		test('passwordConfirm', 'Password does not match', () => {
			enforce(data.passwordConfirm).equals(data.password)
		})
	})
})

export const ForgotPasswordSchema = (data) => suiteRun(forgotPasswordSuite, data)
export const SignInSchema = (data) => suiteRun(signInSuite, data)
export const SignUpSchema = (data) => suiteRun(signUpSuite, data)
export const WaitingListSchema = (data) => suiteRun(waitingListSuite, data)
export const ResetPasswordSchema = (data) => suiteRun(resetPasswordSuite, data)
