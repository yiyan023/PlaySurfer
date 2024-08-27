import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const ProfileDiv = () => {
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
	<div className="profile-div bg-l-blue py-10 absolute bottom-0 left-0 w-full px-16">
		<div className='flex flex-row items-center justify-center'>
			<div className='relative h-10'>
				<FontAwesomeIcon icon={faCircleUser} className="user-profile h-full mr-5"/>
			</div>
			{!small && 
				<div>
					<h1 className="font-livvic text-mod">First Last</h1>
					<p className="font-montserrat text-small italic">@handle</p>
				</div>
			}
		</div>
	</div>
  )
}

export default ProfileDiv