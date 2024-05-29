import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Messages from './components/Messages';
import Schedule from './components/Schedule';
import Feed from './components/Feed';
import Activity from './components/Activity';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <Router>
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/messages" element={<Messages />}/>
			<Route path="/schedule" element={<Schedule />} />
			<Route path="/feed" element={<Feed />}/>
			<Route path="/activity" element={<Activity />} />
			<Route path="/profile" element={<Profile />}/>
		</Routes>
	  </Router>
    </>
  )
}

export default App
