import { Button } from '@nextui-org/react'
import { useAuthUser } from './useAuth'
import { logout } from '.'

export default function LogoutBtn(props: typeof Button.defaultProps) {
	const [, setUser] = useAuthUser()

	const handleLogout = async () => {
		const success = await logout()
		if (success) {
			setUser(null)
		}
	}

	return <Button children="Log out" {...props} onClick={handleLogout} />
}
