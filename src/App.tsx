import ThemeSwitch from './components/ThemeSwitch'

export default function App() {
	return (
		<div className="grid h-screen place-items-center">
			<ThemeSwitch className="fixed right-2 top-2 z-10" />
			<h1>Spr Extension</h1>
		</div>
	)
}
