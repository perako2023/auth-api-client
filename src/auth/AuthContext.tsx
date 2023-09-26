import { createContext, useEffect, useState } from 'react'
import { getUserData } from '.'
import AuthPage from '../pages/AuthPage'

type AuthContext = {
	user: Auth.User | null
	setUser: React.Dispatch<React.SetStateAction<Auth.User | null>>
}

type AuthProviderProps = {
	children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContext)

export default function AuthProvider(props: AuthProviderProps) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<Auth.User | null>(null)

	useEffect(() => {
		getUserData().then((data) => {
			setUser(data)
			setLoading(false)
		})
	}, [])

	if (loading) return null

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{user ? props.children : <AuthPage />}
		</AuthContext.Provider>
	)
}
