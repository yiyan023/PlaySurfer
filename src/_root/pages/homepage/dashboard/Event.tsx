import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { CreateEvent } from "@/lib/validation"
import { useCreateEvent } from "@/lib/react-query/queriesAndMutations"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { databases } from "@/lib/appwrite/config"
import { appwriteConfig } from "@/lib/appwrite/config"
import { IUser } from "@/types"
import { Query } from "appwrite"

const Event = () => {
	const [name, setName] = useState("")
	const [users, setUsers] = useState<Document[]>([])
	const [results, setResults] = useState([])

	const form = useForm<z.infer<typeof CreateEvent>>({
		resolver: zodResolver(CreateEvent),
		defaultValues: {
		  	date: new Date(),
			sport: "",
			users: []
		},
	})  

	const { mutateAsync: createEvent } = useCreateEvent();

	async function onSubmit(values: z.infer<typeof CreateEvent>) {
		const event = await createEvent(values);

		if (event && values.sport != "") {
			console.log(event);
		} else {
			return toast({
				title: "Failed to create event. Try again."
			})
		}
	}

	const fetchUsers = async () => {
		if (name.length > 0) {
			try {
				const response = await databases.listDocuments(
					appwriteConfig.databaseID,
					appwriteConfig.usersID,
					[
						Query.or([Query.contains('name', [name]), Query.contains('username', [name])]),
						Query.limit(5)
					]
				);

				console.log(name);
				console.log(response.documents)
			} catch (error) {
				
			}
		}
	}

	return (
		<div className="relative">
			<Form {...form}>
				<div className="flex-center flex-col">
					<h2 className="text-center text-xl text-d-blue mb-4 font-livvic"><b>Create New Event</b></h2>
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center items-center w-full">
					<div className="w-full">
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
								<FormControl>
									<div>
										<DatePicker
											className="date-picker text-center border border-d-blue p-2 rounded font-montserrat w-full"
											selected={field.value}
											onChange={(date) => {field.onChange(date)}}
											dateFormat="yyyy/MM/dd"
											/>
									</div>
								</FormControl>
								<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full">
						<FormField
							control={form.control}
							name="sport"
							render={({ field }) => (
								<FormItem>
								<FormControl>
									<select
										{...field}
										onChange={(e) => {field.onChange(e.target.value)}}
										className="bg-white text-center border border-d-blue p-2 rounded font-montserrat w-full"
									>
										<option disabled value={undefined}>Select a Sport</option>
										<option value="Badminton">Badminton</option>
										<option value="Baseball">Baseball</option>
										<option value="Basketball">Basketball</option>
										<option value="Football">Football</option>
										<option value="Hockey">Hockey</option>
										<option value="Rugby">Rugby</option>
										<option value="Swimming">Swimming</option>
										<option value="Tennis">Tennis</option>
										<option value="Volleyball">Volleyball</option>
									</select>
								</FormControl>
								<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full">
						<FormField
							control={form.control}
							name="users"
							render={({ field }) => (
								<FormItem>
								<FormControl>
									<Input
										className="border-d-blue placeholder:text-l-blue text-d-blue"
										{...field}
										placeholder="Add people to event"
										value={name}
										onChange={(e) => {
											setName(e.target.value); 
											fetchUsers();
											// Pass the array to the form
										}}
										/
									>
								</FormControl>
								<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full">
						<Button type="submit" className="w-full mt-3">
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Event