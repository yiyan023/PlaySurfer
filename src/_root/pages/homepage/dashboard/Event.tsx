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
import { useEffect, useState } from "react"
import { databases } from "@/lib/appwrite/config"
import { appwriteConfig } from "@/lib/appwrite/config"
import { Query } from "appwrite"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Event = () => {
	const [name, setName] = useState("")
	const [documents, setDocuments] = useState<JSX.Element[]>([])
	const [showImage, setShowImage] = useState(true);
	const [users, setUsers] = useState<string[]>([])
	const [userSet, setUserSet] = useState<Set<string>>(new Set())

	window.addEventListener('resize', () => {
			
		if (window.innerWidth <= 700) {
			setShowImage(false)
		} else {
			setShowImage(true)
		}

		console.log(window.innerWidth, showImage)
	})

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

	useEffect(() => {
		const fetchUsers = async () => {
			if (name.trim() === '') {
                setDocuments([]); // Clear dropdown if input is empty
                return;
            }

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
	
					const documentOption = response.documents.map(document => {
						return (
							<div 
								key={document.$id} 
								onClick={() => {
									if (!userSet.has(document.$id)) {
										setUsers(prevUsers => [...prevUsers, document.$id])
									}

									setUserSet(prevUserSet => new Set(prevUserSet).add(document.$id));
									console.log(users, userSet)
								}}
								className="border border-d-blue border-1 rounded flex flex-row justify-center items-center p-5"
							>
								{showImage && 
									<div className="flex justify-center items-center">
										{document.imageURL != null ? (<img src={document.imageURL} className="h-10"/>) : (<FontAwesomeIcon icon={faUser} className="h-8 mr-2"/>)}
									</div>
								}
								<div className="truncate">
									<h2 className="text-small font-livvic truncate">{document.name}</h2>
									<h3 className="text-xs font-montserrat truncate">@{document.username}</h3>
								</div>
							</div>
						)
					})
	
					setDocuments(documentOption)
				} catch (error) {
					console.log(error)
				}
			}
		}

		fetchUsers();
	}, [name, showImage, users])

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
									<div>
										<Input
											className="border-d-blue placeholder:text-l-blue text-d-blue"
											{...field}
											placeholder="Add people to event"
											value={name}
											onChange={(e) => {
												setName(e.target.value); 
												// Pass the array to the form
											}}
											/
										>
										 <div className="dropdown-container">
											<div className="dropdown">
												{documents}
											</div>
										</div>
									</div>
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