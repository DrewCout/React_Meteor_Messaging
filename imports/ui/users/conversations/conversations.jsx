import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

// import utilities and helpers
import useSubscription from '../../../api/hooks/useSubscription'

export const ConversationsComponent = () => {

	const { url } = useRouteMatch()
	const history = useHistory()
	
	const [overlayToggle, setOverlayToggle] = useState(false)
	const [threads, setThreads] = useState([])
	const [users, setUsers] = useState([])
	
	// subscribe to data
	const loading = useSubscription('User_Threads')
	const loadingUsers = useSubscription('All_Users_Username')

	const changeView = () => {
		setOverlayToggle(!overlayToggle)
	}

	useEffect(() => {
		if (!loading && Meteor.userId) {
			loadData()
		}
	}, [loading])

	useEffect(() => {
		if (!loadingUsers && Meteor.userId) {
			loadUsersData()
		}
	}, [loadingUsers])

	const loadData = () => {
		const threadsQuery = Message_Threads.find({ $or: [{ user1: Meteor.userId }, { user2: Meteor.userId }] }).fetch()
		setThreads(threadsQuery)
	}

	const loadUsersData = () => {
		const usersQuery = Meteor.users.find({}).fetch()
		setUsers(usersQuery)
	}



	handleThreadClick = (thread) => {
		if (Meteor.user().username == thread.user1) { 
			history.push('messages/' + thread._id, thread.user2)
		} else { 
			history.push('messages/' + thread._id, thread.user1)
		}
	}

	const handleNewThread = (user) => {
		const data = { user1: Meteor.user().username, user2: user.username, messages: [] }
		Meteor.call('Start_New_Thread', data, (error, result) => {
			if (error) {
				alert(error)
			} else { 
				let newThreadId = result
				history.push('messages/' + newThreadId, data.user2 )
			}
		})
	}

	const handleDeleteThread = (thread) => {
		const threadToDelete = thread._id
		Meteor.call('Delete_Thread', threadToDelete, (error, result) => {
			if (error) {
				alert(error)
			} else { 
				window.location.reload()
				return result
			}
		})
	}

	return (
		<div className="ConversationsComponent">
			<div className="header">
				<h2>Conversations</h2>
				<button className="submit-btn" onClick={() => changeView()}>New Conversation</button>
			</div>
			<div className='container'>
				{threads.length ? <div className="thread-container">
					<div className="table">
						{threads.map((thread) => {
							return <div key={thread._id}>
									<div className="headers" onClick={() => handleThreadClick(thread)}>
											{(Meteor.user().username === thread.user1) ? 
											<div>{thread.user2}</div> : <div>{thread.user1}</div>}
									</div>
									<button className='delete-btn' onClick={() => handleDeleteThread(thread)}>Delete</button>	
								</div>
								
						})}
					</div>
					<div className="spacer"></div>
				</div>
					
				: <div>Loading ...</div>}
				{overlayToggle ?
					<div className='new-conversation-overlay'>
						<div className='header'>
							<h2>Send Message To...</h2>
						</div>
						<div className='user-list'>
							{users.map((user) => {
								return <div key={user._id} >
									<div className="row" onClick={() => handleNewThread(user)}>
										<div>{user.username}</div>
									</div>
									
								</div>
							})}
						</div>
					</div>
					: <div></div>
				}
			</div>
  	</div>
	)
};