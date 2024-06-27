import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "@/lib/validation"
import { z } from "zod"
import Logo from '/assets/logos/ps-logo-circle.png'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const Login = () => {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		  	username: "",
		},
	})  

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	} 
	
	return (
		<div className="bg-d-blue p-10 rounded-lg flex flex-col justify-center">
			<div className="flex flex-row items-center justify-center mb-3">
				<img src={Logo} className="w-20"/>
				<h1 className="text-white text-5xl font-livvic cursor-default">PlaySurfer</h1>
			</div>
			<Form {...form} >
				<div className="flex-center flex-col">
					<h2 className="font-montserrat text-center text-xl text-white mb-4">Login</h2>
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
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
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</Form>
			<div className="flex flex-row justify-between mt-5">
				<p className="text-l-blue cursor-default">Don't have an account?</p>
				<a onClick={() => {navigate('/sign-up')}} className="text-white hover:text-l-blue cursor-pointer">Signup</a>
			</div>
		</div>
  	)
}

export default Login