import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import toaster from 'react-hot-toast'
import EyeSlashFilledIcon from '../assets/EyeSlashFilledIcon'
import EyeFilledIcon from '../assets/EyeFilledIcon'

export default function AuthForm({
	initialType = 'Login',
	onFormTypeToggle,
	onFormSubmit
}: NSAuthForm.Props) {
	const [type, setType] = useState(initialType)
	const [formSubmitInProgress, setFormSubmitInProgress] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const inverseType = () => (type === 'Login' ? 'Register' : 'Login')
	const hideOnLogin = (element: React.ReactNode) => (type === 'Login' ? '' : element)

	const toggleForm = () => {
		const newType = inverseType()
		setType(newType)
		onFormTypeToggle?.(newType)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (formSubmitInProgress) return
		setFormSubmitInProgress(true)
		e.preventDefault()

		const formData = Object.fromEntries(new FormData(e.currentTarget)) as NSAuthForm.Data

		if (type === 'Register' && formData['confirm-password'] !== formData.password) {
			toaster.error('Passwords do not match!')
		} else await onFormSubmit?.({ formData })

		setFormSubmitInProgress(false)
	}

	const passInputEndContent = (
		<button
			className="focus:outline-none"
			type="button"
			onClick={() => setShowPassword(!showPassword)}
		>
			{showPassword ? (
				<EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
			) : (
				<EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
			)}
		</button>
	)

	return (
		<form className="flex" onSubmit={handleSubmit}>
			<fieldset className="[&>*]:w-unit-6xl mx-8 my-2 flex flex-col gap-2 px-8 py-4">
				{/* <legend>Authentication Form</legend> */}

				{hideOnLogin(
					<Input
						isRequired
						type="text"
						name="username"
						label="username"
						variant="bordered"
					/>
				)}

				<Input
					isRequired
					type="email"
					name="email"
					label="email"
					variant="bordered"
					autoFocus
				/>

				<Input
					isRequired
					type={showPassword ? 'text' : 'password'}
					name="password"
					label="password"
					variant="bordered"
					endContent={passInputEndContent}
				/>

				{hideOnLogin(
					<Input
						isRequired
						type={showPassword ? 'text' : 'password'}
						name="confirm-password"
						label="confirm-password"
						variant="bordered"
						endContent={passInputEndContent}
					/>
				)}

				<div className="flex justify-center gap-1 px-2 py-1">
					<p>
						{type === 'Login' ? `don't have an account?` : `already have an account?`}
					</p>
					<button onClick={toggleForm} type="button" className="text-primary">
						{inverseType()}
					</button>
				</div>

				<Button
					isLoading={formSubmitInProgress}
					className="bg-primary cursor-pointer"
					type="submit"
				>
					{type}
				</Button>
			</fieldset>
		</form>
	)
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace NSAuthForm {
	type Type = 'Login' | 'Register'

	type onSubmit = (params: { formData: NSAuthForm.Data }) => Promise<void>

	type Data = {
		username: string // register only
		email: string
		password: string
		'confirm-password': string // register only
	}

	type Props = {
		initialType?: NSAuthForm.Type
		onFormTypeToggle?: (newType: NSAuthForm.Type) => void
		onFormSubmit?: NSAuthForm.onSubmit
	}
}
