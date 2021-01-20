import React, { useState, useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import { useHistory } from 'react-router'
import useSubscription from '../../../api/hooks/useSubscription'

export const AccountComponent = () => {

	const history = useHistory()

	const loading = useSubscription('All_Users_Username')

	const [newUsername, setNewUsername] = useState(null)
	const [newPassword, setNewPassword] = useState(null)
	const [currentUsername, setCurrentUsername] = useState(null)

	useEffect(() => {
		if(!loading && Meteor.userId) {
			usernameQuery = Meteor.user({fields: {username: 1}})
			setCurrentUsername(Meteor.user().username)
		}
	}, [loading]);

	handleUpdateUsername = () => {
		data = { userId: Meteor.userId(), newUsername: newUsername }
		Meteor.call('Update_Username', data, (error, result) => {
			if (error) {
				alert(error)
			} else {
				alert('New Username: ' + newUsername)
			}
		})
	}

	handleUpdatePassword = () => {
		data = { userId: Meteor.userId(), newPassword: newPassword }
		Meteor.call('Update_Password', data, (error, result) => {
			if (error) {
				alert(error)
			} else {
				alert('Password Successfully Changed')

			}
		})
	}

	return (
		<div className='Account'>
			<div className="header">
				<button className="submit-btn" onClick={() => history.goBack()}>Back</button>
				<h2>Account Information</h2>
			</div>
			<div className='field-container'>
				<h2>{currentUsername}</h2>
				<label>Change Username</label>
				<div className='field'>
					<input type='text' onChange={(e) => setNewUsername(e.target.value)}></input>
					<button type='submit' className='submit-btn' onClick={() => handleUpdateUsername()}>Update Username</button>
				</div>
				<label>Change Password</label>
				<div className='field'>
					<input type='text' onChange={(e) => setNewPassword(e.target.value)}></input>
					<button type='submit' className='submit-btn' onClick={() => handleUpdatePassword()}>Update Password</button>
				</div>
			</div>
		</div>
	)
}