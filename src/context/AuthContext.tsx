// session time for user -> are they logged in?

import { getCurrentUser } from "@/lib/appwrite/api"
import { IContextType, IUser } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const INITIAL_USER = {
	name: '',
	username: '',
	email: '',
	imageUrl: '',
	bio: ''
}

export const INITIAL_STATE = {
	user: INITIAL_USER,
	isLoading: false,
	isAuthenticated: false,
	setUser: () => {},
	setIsAuthenticated: () => {},
	checkAuthUser: async() => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({ children } : { children: React.ReactNode}) => {
	const [user, setUser] = useState<IUser>(INITIAL_USER)
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const navigate = useNavigate();

	const checkAuthUser = async () => {
		try {
			const currentAccount = await getCurrentUser();

			if (currentAccount) {
				setUser({
					name: currentAccount.name,
					username: currentAccount.username,
					email: currentAccount.email,
					imageUrl: currentAccount.imageUrl,
					bio: currentAccount.bio
				})
			}

			setIsAuthenticated(true);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		user,
		setUser,
		isLoading,
		isAuthenticated,
		setIsAuthenticated,
		checkAuthUser
	}

	useEffect(() => {
		if(localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null) navigate('login'); // session has been logged out
		checkAuthUser(); // once the user logs in, checks for authentication
	}, []) 

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export const useUserContext = () => useContext(AuthContext); // export the context for user in other files

export default AuthProvider