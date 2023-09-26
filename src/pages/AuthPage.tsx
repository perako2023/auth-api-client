import { useEffect, useRef } from 'react'
import AuthForm, { NSAuthForm } from '../components/AuthForm'
import toast from 'react-hot-toast'
import { login, register } from '../auth'
import { useAuthUser } from '../auth/useAuth'

export default function AuthPage() {
	const [, setUser] = useAuthUser()

	const formType = useRef<NSAuthForm.Type>('Login')
	const authToastLoadingId = useRef<string>('')

	const handleAuthFormSubmit: NSAuthForm.onSubmit = async ({ formData }) => {
		authToastLoadingId.current = toast.loading(`${formType.current} in progress...`, {
			duration: Infinity
		})

		const user = formType.current === 'Login' ? await login(formData) : await register(formData)

		toast.dismiss(authToastLoadingId.current)
		if (user) setUser(user)
	}

	useEffect(() => {
		return () => toast.dismiss(authToastLoadingId.current)
	}, [])

	return (
		<div className="bg-background fixed inset-0 grid place-items-center">
			<AuthForm
				onFormSubmit={handleAuthFormSubmit}
				onFormTypeToggle={(newType) => (formType.current = newType)}
			/>
		</div>
	)
}
