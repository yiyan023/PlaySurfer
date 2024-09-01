import { useState } from 'react';
import Event from './Event'
import '../styling/Modal.css'

interface ModalProps {
	hideModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ hideModal }) => {
	const [toggleChoices, setToggleChoices] = useState(true);
	const [toggleEvent, setToggleEvent] = useState(false);

	const showEvent = () => {
		setToggleEvent(true);
		setToggleChoices(false);
	}

	return (
		<div className="modal-overlay">
			{toggleChoices && 
				<div>
					<button onClick={showEvent} className='modal-choice'>Event</button>
					<button className='modal-choice'>Friend</button>
					<button className='modal-choice'>Invite</button>
					<button onClick={hideModal} className='modal-choice'>Close</button>
				</div>
			}
			{toggleEvent && 
				<Event />
			}
		</div>
	)
}

export default Modal