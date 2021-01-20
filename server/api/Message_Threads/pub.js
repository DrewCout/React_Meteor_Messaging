import { Meteor } from 'meteor/meteor'

// publish current user message threads data
Meteor.publish('User_Threads', function () {
	if (this.userId) {
		let threads = Message_Threads.find({ $or: [{ user1: Meteor.user().username }, { user2: Meteor.user().username }] })
	return threads
	} else {
		this.ready()
	}
})

// publish messages to the thread
Meteor.publish('Thread_Messages', function (thread) {
	if (thread && this.userId) {
		let messages = Messages.find({ threadId: thread })
	return messages
	} else {
		this.ready()
	}
})


