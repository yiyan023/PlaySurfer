import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
	projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
	url: import.meta.env.VITE_APPWRITE_URL,
	databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
	storageID: import.meta.env.VITE_APPWRITE_STORAGE_ID,
	savesID: import.meta.env.VITE_APPWRITE_SAVES_ID,
	usersID: import.meta.env.VITE_APPWRITE_USERS_ID,
	postsID: import.meta.env.VITE_APPWRITE_POSTS_ID
}

export const client = new Client(); 

console.log(import.meta.env.VITE_APPWRITE_URL)

client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client); 
export const databases = new Databases(client); 
export const storage = new Storage(client); 
export const avatars = new Avatars(client); 
