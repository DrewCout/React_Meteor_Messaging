import { Meteor } from 'meteor/meteor'

// publish usernames for thread
Meteor.publish('All_Users_Username', function () {
	if (this.userId) {
		let usernames = Meteor.users.find({}, {fields: {username: 1} })
		return usernames
	} else {
		this.ready()
	}
})