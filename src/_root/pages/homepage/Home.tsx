import Dashboard from "./Dashboard"
import NavBar from "./NavBar"
import './styling/Home.css'

const Home = () => {
  return (
	<div className="app flex flex-row w-screen">
		<NavBar />
		<Dashboard />
	</div>
  )
}

export default Home