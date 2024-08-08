import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import { z } from "zod"
import Logo from '/assets/logos/ps-logo-circle.png'
import { account } from "@/lib/appwrite/config"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { useUserContext } from "@/context/AuthContext"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"

const Login = () => {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
		  	email: "",
			password: ""
		},
	})  

	const { checkAuthUser, isLoading: isUserLoading} = useUserContext();
	const { mutateAsync: signInAccount, status: isSigningInUser } = useSignInAccount();

	async function onSubmit(values: z.infer<typeof SigninValidation>) {
		const currentSession = await account.getSession('current');

		if (currentSession) {
			account.deleteSession('current')
		}

		const session = await signInAccount({
			email: values.email,
			password: values.password
		});

		if(!session) {
			return toast({
				title: 'Sign in failed. Please try again.'
			})
		}

		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			form.reset(); 
			navigate('/');
		} else {
			return toast({ title: 'Failed to log in. Please try again.'});
		}
	} 
	
	return (
		<div className="bg-d-blue p-10 rounded-lg flex flex-col justify-center">
			<div className="flex flex-row items-center justify-center mb-3">
				<img src={Logo} className="w-20"/>
				<h1 className="text-white text-5xl font-livvic cursor-default">PlaySurfer</h1>
			</div>
			<Form {...form} >
				<div className="flex-center flex-col">
					<h2 className="font-montserrat text-center text-xl text-white mb-4">Log in</h2>
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
						<FormControl>
							<Input type="email" placeholder="Email" {...field} />
						</FormControl>
						<FormMessage />
						</FormItem>
					)}
					/>
					<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
						<FormControl>
							<Input type="password" placeholder="Password" {...field} />
						</FormControl>
						<FormMessage />
						</FormItem>
					)}
					/>
					<div className="flex flex-col justify-center mt-2">
						<Button type="submit">
							{isSigningInUser === "pending" || isUserLoading ? ("Loading") : ("Submit")}
						</Button>
					</div>
				</form>
			</Form>
			<div className="flex flex-row justify-between mt-5">
				<p className="text-l-blue cursor-default">Don't have an account?</p>
				<a onClick={() => {navigate('/sign-up')}} className="text-white hover:text-l-blue cursor-pointer">Sign up</a>
			</div>
		</div>
  	)
}

export default Login