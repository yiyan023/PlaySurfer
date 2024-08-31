import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from "./dashboard/Modal";


const Dashboard = () => {
	const [toggleModal, setToggleModal] = useState(false);

	const showModal = () => {
		setToggleModal(true)
	}

	const hideModal = () => {
		setToggleModal(false);
	}

	return (
		<div className="flex flex-col flex-grow w-full p-10 relative">
			<div className={toggleModal ? "toggle-modal flex flex-row w-full justify-center" : "flex flex-row w-full justify-center"}>
				<input type="text" placeholder="Search..." className="search-bar placeholder-l-blue placeholder:font-montserrat bg-white border-2 border-d-blue rounded text-d-blue pl-2 w-full"></input>
				<button className="add-button bg-transparent flex items-center justify-center text-d-blue" onClick={showModal}>
					<FontAwesomeIcon icon={faCirclePlus}/>
				</button>
			</div>
			<div className={toggleModal ? "toggle-modal" : ""}>
				<h1 className="text-large text-d-blue font-livvic mt-8 relative flex items-center">Available Today
					<span className="border-t-2 border-d-blue ml-5 flex-grow "></span>
				</h1>
			</div>
			{toggleModal && 
				<Modal hideModal={hideModal}/>
			}
		</div>
	)
}

export default Dashboard