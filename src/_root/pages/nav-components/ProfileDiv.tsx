import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const ProfileDiv = () => {
  return (
	<div className="bg-l-blue py-10 flex flex-row items-stretch absolute bottom-0 left-0 w-full justify-between px-16">
		<div>
			<FontAwesomeIcon icon={faCircleUser} className="h-full w-auto mr-5"/>
		</div>
		<div>
			<h1 className="font-livvic text-medium">First Last</h1>
			<p className="font-montserrat text-small italic">@handle</p>
		</div>
	</div>
  )
}

export default ProfileDiv