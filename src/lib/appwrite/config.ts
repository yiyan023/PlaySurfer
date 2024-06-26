import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
	projectID:'667c85ca002a2a78d9ec',
	url: import.meta.env.VITE_APPWRITE_URL
}

export const client = new Client(); 

client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client); 
export const databases = new Databases(client); 
export const storage = new Storage(client); 
export const avatars = new Avatars(client); 
