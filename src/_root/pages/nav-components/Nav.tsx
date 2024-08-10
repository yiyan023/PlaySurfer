const Nav = () => {
  return (
	<div className="bg-d-blue text-white flex flex-col p-10">
		<h1 className="font-montserrat mt-10 text-large mb-20">PlaySurfer</h1>
		<div className="my-5 flex flex-col">
			<button className="bg-transparent font-montserrat text-medium text-right">
				MESSAGES
			</button>
			<button className="bg-transparent font-montserrat text-medium text-right">
				SCHEDULE
			</button>
			<button className="bg-transparent font-montserrat text-medium text-right">
				FEED
			</button>
			<button className="bg-transparent font-montserrat text-medium text-right">
				ACTIVITY
			</button>
		</div>
	</div>
  )
}

export default Nav