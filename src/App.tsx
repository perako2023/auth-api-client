import ThemeSwitch from './components/ThemeSwitch'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './auth/AuthContext'
import LogoutBtn from './auth/LogoutBtn'

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT
axios.defaults.withCredentials = true

export default function App() {
	return (
		<>
			<Toaster position="top-center" toastOptions={{ duration: 5 * 1000 }} />
			<ThemeSwitch className="fixed right-2 top-2 z-10" />
			<div className="grid h-screen place-items-center">
				<AuthProvider>
					<LogoutBtn className="fixed right-14 top-2 z-10" />
					<h1>Spr Extension</h1>
				</AuthProvider>
			</div>
		</>
	)
}
