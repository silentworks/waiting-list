import { create, test, enforce, skipWhen } from 'vest'
import isEmail from 'pragmatic-email-regex'
import { suiteRun } from '$lib/utils'

enforce.extend({ isEmail })

const emailValidation = (data: { email: string }) => {
	test('email', 'Email is required', () => {
		enforce(data.email).isString().isNotEmpty()
	})

	console.log({ e: data.email })
	// test('email', 'Email Address is not valid', () => {
	// 	enforce(data.email).isEmail()
	// })
}

const passwordValidation = (data: { password: string }) => {
	test('password', 'Password is required', () => {
		enforce(data.password).isString().isNotEmpty()
	})

	test('password', 'Password must be at least 6 characters', () => {
		enforce(data.password).longerThanOrEquals(6)
	})
}

const forgotPasswordSuite = create((data) => {
	emailValidation(data)
})

const signInSuite = create((data) => {
	emailValidation(data)
	passwordValidation(data)
})

const signUpSuite = create((data) => {
	emailValidation(data)
	passwordValidation(data)

	test('fullName', 'Full Name is required', () => {
		enforce(data.fullName).isString().isNotEmpty()
	})
})

const waitingListSuite = create((data) => {
	emailValidation(data)

	test('fullName', 'Full Name is required', () => {
		enforce(data.fullName).isString().isNotEmpty()
	})
})

const resetPasswordSuite = create((data) => {
	passwordValidation(data)

	skipWhen(!data.password, () => {
		test('passwordConfirm', 'Password does not match', () => {
			enforce(data.passwordConfirm).equals(data.password)
		})
	})
})

interface ForgotPassword {
	email: string
}

interface SignIn {
	email: string
	password: string
}

interface SignUp {
	email: string
	password: string
	fullName: string
}

interface WaitingList {
	email: string
	fullName: string
}
interface ResetPassword {
	password: string
	passwordConfirm: string
}

export const ForgotPasswordSchema = (data: ForgotPassword) => suiteRun(forgotPasswordSuite, data)
export const SignInSchema = (data: SignIn) => suiteRun(signInSuite, data)
export const SignUpSchema = (data: SignUp) => suiteRun(signUpSuite, data)
export const WaitingListSchema = (data: WaitingList) => suiteRun(waitingListSuite, data)
export const ResetPasswordSchema = (data: ResetPassword) => suiteRun(resetPasswordSuite, data)
