import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './_root/pages/Home';
import Messages from './_root/pages/Messages';
import Schedule from './_root/pages/Schedule';
import Feed from './_root/pages/Feed';
import Activity from './_root/pages/Activity';
import Profile from './_root/pages/Profile';
import Login from './_auth/forms/Login';
import SignUp from './_auth/forms/SignUp';
import RootLayout from './_root/RootLayout';
import AuthLayout from './_auth/AuthLayout';

import { Toaster } from "@/components/ui/toaster"


function App() {
  return (
	<main className='flex h-screen w-screen'>
		<Router>
		<Routes>
			{/* public routes */}
			<Route element={<AuthLayout />}>
				<Route path="/login" element={<Login/>}/>
				<Route path="/sign-up" element={<SignUp />}/>
			</Route>

			{/* private routes */}
			<Route element={<RootLayout />}>
				<Route index path="/" element={<Home />}/>
				<Route path="/messages" element={<Messages />}/>
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/feed" element={<Feed />}/>
				<Route path="/activity" element={<Activity />} />
				<Route path="/profile" element={<Profile />}/>
			</Route>
		</Routes>
	  	</Router>

		<Toaster />
	</main>
  )
}

export default App
