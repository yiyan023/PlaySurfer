import { z } from "zod"

export const SignUpValidation = z.object({
	name: z.string().min(2, { message: "Name must be a min of 2 characters"}).max(100, { message: "Name must be fewer than 100 characters"}),
	username: z.string().min(2, { message: "Username must be a min of 2 characters"}).max(50),
	email: z.string().email(),
	password: z.string().min(10, { message: "Password must be a min of 10 characters"})
})

export const SigninValidation = z.object({
	email: z.string().email(),
	password: z.string().min(10, { message: "Password must be a min of 10 characters"})
})