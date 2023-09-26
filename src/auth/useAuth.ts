import { useContext } from 'react'
import { AuthContext } from './AuthContext'

/**
 * A custom hook that provides access to the authenticated user and a function to set the user, similar to useState.
 *
 * @returns {Array} An array containing the authenticated user and the function to set the user.
 *
 * @example
 * // Usage example
 * const [user, setUser] = useAuthUser();
 */
export const useAuthUser = () => {
	const authContext = useContext(AuthContext)

	const user = authContext.user
	const setUser = authContext.setUser

	return [user, setUser] as const
}
