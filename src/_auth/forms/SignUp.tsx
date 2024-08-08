import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignUpValidation } from "@/lib/validation"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { account } from "@/lib/appwrite/config"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
  } from "@/components/ui/form"

import Logo from './../../../public/assets/logos/ps-logo-circle.png'
import { useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignUp = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { checkAuthUser, isLoading: isUserLoading} = useUserContext();

	const form = useForm<z.infer<typeof SignUpValidation>>({
		resolver: zodResolver(SignUpValidation),
		defaultValues: {
			name: "",
		  	username: "",
			email: "",
			password: ""
		},
	})  

	const { mutateAsync: createUserAccount, status: isCreatingAccount } = useCreateUserAccount();
  	const { mutateAsync: signInAccount, status: isSigningInUser } = useSignInAccount();

	async function onSubmit(values: z.infer<typeof SignUpValidation>) {
		const newUser = await createUserAccount(values);
		
		if (!newUser) {
			return toast({
				title: 'Sign up failed. Please try again.'
			})
		}

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
					<h2 className="font-montserrat text-center text-xl text-white mb-4">Create a New Account</h2>
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
						<FormControl>
							<Input type="text" placeholder="Name" {...field} />
						</FormControl>
						<FormMessage />
						</FormItem>
					)}
					/>
					<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
						<FormControl>
							<Input type="text" placeholder="Username" {...field} />
						</FormControl>
						<FormMessage />
						</FormItem>
					)}
					/>
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
							{isCreatingAccount === "pending"|| isSigningInUser === "pending" || isUserLoading ? ("Loading") : ("Submit")}
						</Button>
					</div>
				</form>
			</Form>
			<div className="flex flex-row justify-between mt-5">
				<p className="text-l-blue cursor-default">Have an account?</p>
				<a onClick={() => {navigate('/login')}} className="text-white hover:text-l-blue cursor-pointer">Login</a>
			</div>
		</div>
  	)
}

export default SignUp