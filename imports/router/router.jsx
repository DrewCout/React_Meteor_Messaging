// import Libraries
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, } from 'react-router-dom'
import { useParams, useRouteMatch } from "react-router-dom";

// import app
import { App } from '../ui/app/app'

// import login
import { Login } from '../ui/login/login'

// import signup
import { SignupComponent } from '../ui/signup/signup'

// import page not found
import { PageNotFound } from '../ui/pageNotFound/pageNotFound'

// import user dash
import { UserDashboard } from '../ui/users/dashboard/dashboard'

// import user conversations
import { ConversationsComponent } from '../ui/users/conversations/conversations'

// import user messages
import { MessagesComponent } from '../ui/users/messages/messages'

// import user account information
import { AccountComponent } from '../ui/users/account/account'

// import admin page
import { AdminComponent } from '../ui/users/admin/admin'



/**
 * Export router
 */
export const MainRouter = () => {
	useEffect(() => {}, [])

	return (
		<App>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Login />
					</Route>

					<Route exact path='/signup'>
						<SignupComponent />
					</Route>

					{/* Users Screens */}
					<Route path='/dashboard'>
						
						{/* Conversations Screens */}
						<Route path='/dashboard/conversations'>
							<UserDashboard>
								<ConversationsComponent/>
							</UserDashboard>
						</Route>

						<Route path='/dashboard/messages/:threadId' >
							<UserDashboard>
								<MessagesComponent />
							</UserDashboard>
						</Route>

						<Route path='/dashboard/admin' >
							<UserDashboard>
								<AdminComponent />
							</UserDashboard>
						</Route>

						{/* <Route path='/dashboard/editMessage/:messageId?'>
							<UserDashboard>
								<Edit_Message_Component />
							</UserDashboard>
						</Route> */}

						<Route path='/dashboard/account'>
							<UserDashboard>
								<AccountComponent />
							</UserDashboard>
						</Route>

					</Route>


					{/* 404 Screens */}
					<Route path='/404'>
						<PageNotFound />
					</Route>
					<Redirect to={'/404'} />
				</Switch>
			</Router>
		</App>
	)
}