import React, { useState, useEffect } from 'react'
import './styles.css'
import HomePage from '../HomePage'
import Login from '../Login'
import PageNotFound from '../PageNotFound'
import Register from '../Register'
import Dashboard from '../Dashboard'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from '../firebase'
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import Orders from '../Dashboard/components/Orders/index'
import EditOrder from '../Dashboard/components/Orders/EditOrder'
import User from '../Dashboard/components/User'

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: yellow,
	  }
});

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})


	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/dashboard/orders" component={Orders} />
					<Route exact path="/dashboard/orders/:order_id" component={EditOrder} />
					<Route exact path="/user" component={User} />
					<Route path="*" component={PageNotFound} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}