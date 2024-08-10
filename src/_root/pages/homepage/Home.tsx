import Dashboard from "./Dashboard"
import NavBar from "./NavBar"

const Home = () => {
  return (
	<div className="flex flex-row">
		<NavBar />
		<Dashboard />
	</div>
  )
}

export default Home