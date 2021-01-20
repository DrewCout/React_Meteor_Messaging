import React, { useState, useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import { useHistory } from 'react-router'

// import utilities and helpers
import useSubscription from '../../../api/hooks/useSubscription'

export const AdminComponent = () => {

	const history = useHistory()

	const loadingUsers = useSubscription('All_Users_Username')

	const [userToDelete, setUserToDelete] = useState(null)
	const [userExists, setUserExists] = useState(false)

	useEffect(() => {
		if (!loadingUsers && Meteor.userId) {
		}
	}, [loadingUsers])

	handleDeleteUser = (userId) => {
		Meteor.call('Delete_User', userId, (error, result) => {
			if (error) {
				alert('User not found')
			} else if (result) {
				alert('User Deleted!')
			}
		})
	}

	return (
		<div className='Admin'>
			<div className="header">
				<button className="submit-btn" onClick={() => history.goBack()}>Back</button>
				<h2>Admin</h2>
			</div>
			<div className='field-container'>
				<label>Delete User</label>
				<div className='field'>
					<input type='text' onChange={(e) => setUserToDelete(e.target.value)}></input>
					<button type='submit' className='submit-btn' onClick={() => handleDeleteUser(userToDelete)}>Delete User</button>
				</div>
			</div>
		</div>
	)
}