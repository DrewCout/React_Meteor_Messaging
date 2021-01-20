import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

export const UserSideNav = () => {

	const [userRole, setUserRole] = useState(null)

	const getUserRole = () => {
		Meteor.call('Get_User_Role', (error, result) => {
			if(error) alert(error)
			else { 
				return setUserRole(result)
			}
		})
	}

	useEffect(() => {
		if (Meteor.userId) {
			getUserRole()
		}
	}, []);

	// get router history
	const history = useHistory()	
	
	return (
		<div className="UserSideNav">
    	<Link to='/dashboard/conversations'>Conversations</Link>
			<div className="hr"></div>
			<Link to='/dashboard/account'>Account</Link>
			<div className="hr"></div>
			<Link to='/' onClick={() => Meteor.logout()}>Logout</Link>
			{userRole === 'ADMIN' ?
			<div className='admin'>
				<div className="hr"></div>
				<Link to='/dashboard/admin'>Admin</Link>
			</div>
			: null
			}
  	</div>
	)
};