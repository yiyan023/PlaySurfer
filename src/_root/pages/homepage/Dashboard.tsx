import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Dashboard = () => {
  return (
	<div className="flex flex-grow w-full p-10 justify-center">
		<input type="text" placeholder="Search..." className="search-bar placeholder-l-blue placeholder:font-montserrat bg-white border-2 border-d-blue rounded text-d-blue pl-2"></input>
		<button className="add-button bg-transparent flex items-center justify-center text-d-blue">
			<FontAwesomeIcon icon={faCirclePlus}/>
		</button>
	</div>
  )
}

export default Dashboard