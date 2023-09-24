import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/button'

import SunIcon from '../assets/SunIcon'
import MoonIcon from '../assets/MoonIcon'

export default function ThemeSwitch(props: { className?: string }) {
	const { theme, setTheme } = useTheme()

	function toggleTheme() {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<Button className={props.className ?? ''} variant="light" isIconOnly onClick={toggleTheme}>
			{theme === 'light' ? <SunIcon /> : <MoonIcon />}
		</Button>
	)
}
