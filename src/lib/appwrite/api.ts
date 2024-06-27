import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			user.name
		)
		
		if (!newAccount) throw Error;

		const avatarURL = avatars.getInitials(user.name);

		const newUser = await saveUserToDB({
			name: newAccount.name,
			email: newAccount.email,
			username: user.username,
			imageURL: avatarURL
		})

		return newUser;
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function saveUserToDB(user: {
	name: string;
	username: string;
	email: string;
	imageURL: URL;
}) {
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseID,
			appwriteConfig.usersID,
			ID.unique(),
			user
		)

		return newUser;
	} catch (error) {
		console.log(error)
	}
}