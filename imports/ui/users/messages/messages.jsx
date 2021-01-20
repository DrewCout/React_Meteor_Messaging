import React, {useEffect, useRef, useState} from 'react';
import { useHistory, useParams, useLocation, useRouteMatch } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import useSubscription from '../../../api/hooks/useSubscription'
import { Img } from 'react-image'

export const MessagesComponent = () => {

	const { threadId } = useParams()
	const location = useLocation()
	const history = useHistory()
	const messagesEndRef = useRef()

	const loading = useSubscription('Thread_Messages', threadId)
	const currentUser = Meteor.userId()

	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState('')
	const [showEditMessage, setShowEditMessage] = useState(false)
	const [updatedMessage, setUpdatedMessage] = useState('')

	useEffect(() => {
		if (!loading) {
			loadMessagesData()
		}
	}, [loading])

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView(
				{
					block: 'end',
				})
		}
	},
	[messages])

	useEffect(() => {
		
	}, [loading]);
	
	const loadMessagesData = () => {
		const messagesQuery = Messages.find({ threadId: threadId }).fetch()
		setMessages(messagesQuery)
	} 

	/*const getUsername = (userId) => {
		return Meteor.users.findOne({ _id: userId }).username.fetch()
	}*/

	const editToggle = () => {
		setShowEditMessage(!showEditMessage)
	}

	const handleSendMessage = () => {
		const data = { message: message, sentBy: currentUser, threadId: threadId }
		Meteor.call('Send_New_Message', data, (error, result) => {
			if (error) {
				alert(error)
			} else {
				window.location.reload()
			}
		})
	}

	const handleEditMessage = (messageData) => {

		if (Meteor.userId() !== messageData.sentBy) {
			alert('Not Authorized')
		} else {
			const data = { id: messageData._id, updatedMessage: updatedMessage, sentBy: messageData.sentBy }
			Meteor.call('Edit_Message', data, (error, result) => {
				if (error) {
					alert('error')
				} else {
					window.location.reload()
				}
			})
		}
	}

	return (
		<div className="MessagesComponent">
			<div className="header">
				<button className="submit-btn" onClick={() => history.goBack()}>Back</button>
				<h2>{location.state}</h2>
			</div>

			<div className='messages-container'>
				<div className='messages'>
						{messages.map((message, i) => {
						
							return <div key={i} >
								
								<div className='row'>
									<div className='message-container'>
										<div className='label'>{(Meteor.userId() !== message.sentBy) ? 
											<div>{location.state}</div> : <div>{Meteor.user().username}</div>}
										</div>
											
										<div className='message'>{message.message}</div>
										{showEditMessage ?
										<div className='edit-message'>
											<input type='text' placeholder='Change message to...' onChange={(e) => {setUpdatedMessage(e.target.value)}} />
											<button className='submit-btn' onClick={() => handleEditMessage(message)} >Update</button>
										</div>
										: null
										}
									</div>
								</div>
							</div>
						})}
						<div ref={messagesEndRef} />
				</div>				
			</div>
			<div className='send-message-container'>
				<Img src='http://simpleicon.com/wp-content/uploads/pencil.svg' onClick={() => editToggle()} />
				<input type='text' id='message-box' placeholder='Type message...' onChange={(e) => setMessage(e.target.value)} />
				<button type='button' className='submit-btn' onClick={() => handleSendMessage()} >Send</button>
			</div>
		</div>
	)
}