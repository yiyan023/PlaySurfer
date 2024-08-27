import { useEffect, useState } from 'react'
import PlaySurfer from '../../../../public/assets/logos/ps-logo-square.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faHeart, faImage, faMessage } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
	const [small, setSmall] = useState(false)

	useEffect(() => {
		window.addEventListener('resize', () => {
			console.log(window.innerWidth)

			if (window.innerWidth < 800) {
				setSmall(true);
			} else {
				setSmall(false);
			}
		})
	}, [])

	return (
		<div className="nav-div bg-d-blue text-white flex flex-col p-10">
			<div className='title-div flex flex-row mt-10  mb-20 justify-center items-center'>
				<img src={PlaySurfer} className='h-80'/>
				{!small && <h1 className="font-montserrat text-large">PlaySurfer</h1>}
			</div>
			<div className="nav-div my-5 flex flex-col">
				<button className="nav-button bg-transparent font-montserrat text-medium text-right">
					{small ?  <FontAwesomeIcon icon={faMessage}/> : 'MESSAGES'}
				</button>
				<button className="nav-button bg-transparent font-montserrat text-medium text-right">
					{small ? <FontAwesomeIcon icon={faCalendar} /> : 'SCHEDULE'}
				</button>
				<button className="nav-button bg-transparent font-montserrat text-medium text-right">
					{small ? <FontAwesomeIcon icon={faImage}/> : 'FEED'}
				</button>
				<button className="nav-button bg-transparent font-montserrat text-medium text-right">
					{small ? <FontAwesomeIcon icon={faHeart}/> : 'ACTIVITY'}
				</button>
			</div>
		</div>
	)
}

export default Nav