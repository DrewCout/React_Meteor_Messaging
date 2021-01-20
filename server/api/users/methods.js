// Framework Resources
import { Meteor } from 'meteor/meteor'
import { clrs } from '../../utilities/terminal_colors'
import { enforceRoles } from '../../utilities/enforceRoles'
import { check, Match } from "meteor/check"

Meteor.methods({

	/*******************************************************************************
	* @description creates a new user document and account
	* @note 
	* @returns {  }
	*******************************************************************************/
	Create_New_User: function(data) {
		check(data, {username: String, email: String, password: String}) // complete this

		const generateMeteorUser = () => {
			const newUserId = Accounts.createUser({
				...data,
				profile: {
					role: String,
				},
			})
	
			console.log(clrs.FgGreen, `Accounts.createUser() made a new user document with _id ${newUserId}`, clrs.Reset)
	
			return newUserId
		}

		const assignRoles = (userId) => {
			Roles.addUsersToRoles(userId, ['USER'])
			console.log(clrs.FgGreen, 'Roles.addUsersToRoles()', clrs.Reset)
		}

		const run = async () => {
			let userId = await generateMeteorUser()
			await assignRoles(userId)
		}

		return run()
	},

	// Change User Password
	Update_Username: function(data) {
		check(data, { userId: String, newUsername: String })

		Accounts.setUsername(data.userId, data.newUsername)
	},

	Update_Password: function(data) {
		check(data, { userId: String, newPassword: String })

		Accounts.setPassword(data.userId, data.newPassword)
	},

	Delete_User: function(userId) {
		if(this.userId) {
			enforceRoles(['ADMIN'])

			const rolesArray = Roles.getRolesForUser(Meteor.userId())
			
			if (rolesArray[0] === 'ADMIN') {
				Meteor.users.remove({ _id: userId, })
			} else {
			throw new Meteor.Error('Error')
			}
		}
	}	

})