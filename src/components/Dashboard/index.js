import React from 'react';
import { useHistory } from 'react-router-dom'
import clsx from 'clsx';
import Header from './components/Header/Header'
import { makeStyles, CssBaseline, Box, Container, Grid, Paper } from '@material-ui/core'
import Chart from './components/Chart';
import Deposits from './components/Deposits';
import Orders from './components/Orders/OrdersList';
import firebase from '../firebase'
import Footer from './components/Footer/Footer';
import PostList from './components/Posts/PostList';
import Title from './components/Title';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}));

export default function Dashboard() {
	const classes = useStyles();
	const history = useHistory()

	if (!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		history.push('/login')
		return null
	}

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						{/* Chart */}
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>
								<Chart />
							</Paper>
						</Grid>
						{/* Recent Deposits */}
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<Deposits />
							</Paper>
						</Grid>
						{/* Recent Orders */}
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Orders />
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Title>Posts</Title>
								<PostList />
							</Paper>
						</Grid>
					</Grid>
					<Box pt={4}>
						<Footer />
					</Box>
				</Container>
			</main>
		</div>
	);
}
