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
import { format, parse } from "date-fns"

const Event = () => {
	const dateFormat = "yyyy/MM/dd"
	const formatDate = (date: Date) => format(date, dateFormat)
	const parseDate = (date: string) => parse(date, dateFormat, new Date())

	const form = useForm<z.infer<typeof CreateEvent>>({
		resolver: zodResolver(CreateEvent),
		defaultValues: {
		  	date: new Date(),
			sport: "",
			users: []
		},
	})  

	const { mutateAsync: createEvent, status: isCreatingEvent } = useCreateEvent();

	async function onSubmit(values: z.infer<typeof CreateEvent>) {
		const event = await createEvent(values);

		if (event) {
			console.log(event);
		}
	}

	return (
		<div>
			<Form {...form}>
				<div className="flex-center flex-col">
					<h2 className="font-montserrat text-center text-xl text-white mb-4">Create New Event</h2>
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem>
							<FormControl>
								<Input 
									type="text" 
									placeholder="Date" 
									value={field.value ? formatDate(field.value) : ""} 
									onChange={(e) => field.onChange(parseDate(e.target.value))}
									/>
							</FormControl>
							<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="sport"
						render={({ field }) => (
							<FormItem>
							<FormControl>
								<select
									{...field}
									onChange={(e) => {field.onChange(e.target.value)}}
									className="bg-white"
								>
									<option disabled value="">Please Select a Sport</option>
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
					<FormField
						control={form.control}
						name="users"
						render={({ field }) => (
							<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Add people to event"
									onChange={(e) => {
										const value = e.target.value;
										const usersArray = value.split(',').map(user => user.trim());
										field.onChange(usersArray); // Pass the array to the form
									  }}
								>
								</Input>
							</FormControl>
							<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<Button type="submit">
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Event