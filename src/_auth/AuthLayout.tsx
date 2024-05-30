import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
	const auth = false;
	return (
		<>
			{ auth ? (
				<Navigate to="/" />
			) : (
				<>
					<img src="../public/assets/login-decoration.png" />
					<section className='flex flex-1 flex-column justify-center items-center p-10'>
						<Outlet />
					</section>
					<img src="../public/assets/login-decoration.png" />
				</>
			)}
		</>
	)
}

export default AuthLayout