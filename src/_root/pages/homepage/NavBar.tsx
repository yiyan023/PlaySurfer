import Nav from "../nav-components/Nav"
import ProfileDiv from "../nav-components/ProfileDiv"

const NavBar = () => {
  return (
	<div className="nav-bar flex flex-col bg-d-blue h-screen w-auto relative">
		<Nav />
		<ProfileDiv />
	</div>
  )
}

export default NavBar