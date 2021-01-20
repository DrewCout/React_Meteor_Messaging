import { check } from 'meteor/check'
 
Meteor.methods({

	// Send a message
	Send_New_Message: function(messageData) {
		check (messageData, { message: String, sentBy: String, threadId: String })

		if (!this.userId) {
			throw new Meteor.Error('User Not Authorized')
		}

		const insertMessage = () => {
				const newMessageId = Messages.insert({
					...messageData,
					sentAt: new Date,
			})
			return newMessageId
		}

		const addMessageToThread = async (newMessageId) => {
			return new Promise((resolve, reject) => {
				Message_Threads.update({ _id: messageData.threadId }, 
					{ $push: { messages: newMessageId } }, (error) => {
						if (error) {
							reject('Error, send failed.')
						} else {
							resolve()
						}
				})
			})
		}

		const run = async () => {
			const newMessageId = insertMessage()

			await addMessageToThread(newMessageId)

			return newMessageId
		}

		return run()
	},

	// Update a message that was already sent
	Edit_Message: function(data) {
		check (data, { id: String, updatedMessage: String, sentBy: String })

		if (!this.userId == data.sentBy) {
			throw new Meteor.Error('User Not Authorized')
		} else {
			Messages.update({ _id: data.id }, {
				$set: { message: data.updatedMessage }
			})
		}
	},

	// Start a new conversation thread
	Start_New_Thread: function(data) {
		check(data, { user1: String, user2: String, messages: Array})

		if (!this.userId) {
			throw new Meteor.Error('Error')
		}

		const newThreadId = Message_Threads.insert({ 
		...data,
		createdAt: new Date,
		})
		return newThreadId
	},


	Delete_Thread: function(id) {

		if (!this.userId) {
			throw new Meteor.Error('Error')
		}
			const deleteId = Message_Threads.remove({ _id: id })
			return deleteId
	}
})