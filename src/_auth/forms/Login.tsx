import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "@/lib/validation"
import { z } from "zod"

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const Login = () => {
	
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
		  username: "",
		},
	})  

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	} 
	
	return (
		<div>
			<h2 className="font-livvic text-center">Login</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
						<FormControl>
							<Input placeholder="Username" {...field} />
						</FormControl>
						<FormDescription>
							This is your public display name.
						</FormDescription>
						<FormMessage />
						</FormItem>
					)}
					/>
					<Button type="submit">Submit</Button>
				</form>
    		</Form>
		</div>
  )
}

export default Login