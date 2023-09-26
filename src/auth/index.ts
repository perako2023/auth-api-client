import axios from 'axios'
import toast from 'react-hot-toast'

export async function register(data: SprAPI.RegisterData) {
	try {
		const res = await axios.post('/api/auth/register', data)

		toast.success('You have successfully registered!')

		return (await res.data) as Auth.User
	} catch (error) {
		handleError(error)
		return null
	}
}

export async function login(data: SprAPI.LoginData) {
	try {
		const res = await axios.post('/api/auth/login', data)

		toast.success('You have successfully logged in!')

		return (await res.data) as Auth.User
	} catch (error) {
		handleError(error)

		return null
	}
}

export async function getUserData() {
	try {
		const res = await axios.get('/api/auth/user')

		return (await res.data) as Auth.User
	} catch (error) {
		return null
	}
}

export function handleError(error: unknown) {
	let errorMessage = 'Something went wrong! Please try again.'

	if (axios.isAxiosError(error)) {
		const sprApiData = error?.response?.data
		if (sprApiData?.error) {
			errorMessage = sprApiData?.error
		}
	}

	toast.error(errorMessage)
}
