import React, { useEffect } from 'react'
import clsx from 'clsx'
import Header from '../Header/Header'
import { makeStyles, Container, Grid, Paper, Box, Avatar, Typography, Divider } from '@material-ui/core'
import Title from '../Title'
import firebase from '../../../firebase'
import { useHistory } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { useState } from 'react'

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
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 240
    },
    spacing: {
        marginRight: theme.spacing(1)
    }
}))

const Orders = () => {
    const classes = useStyles()
    const [userInfo, setUserInfo] = useState({})
    const history = useHistory()

    useEffect(() => {
        setUserInfo(firebase.getUserInfo())
    }, [])

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Please login first')
        history.push('/login')
        return null
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
        <div className={classes.root}>
            <Header />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* New Order */}
                        <Grid item xs={4}>
                            <Paper className={fixedHeightPaper}>
                                <Box display="flex" justifyContent="center">
                                    <Avatar src={userInfo.photoURL} className={classes.spacing}></Avatar>
                                    <Title>Welcome back</Title>

                                </Box>
                            </Paper>
                        </Grid>
                        {/* All Orders */}
                        <Grid item xs={8}>
                            <Paper className={fixedHeightPaper}>
                                <Box>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom align="center">Your information</Typography>
                                    <Typography component="p" >Name: {userInfo.displayName}</Typography>
                                    <Divider />
                                    <Typography component="p" >Email: {userInfo.email}</Typography>
                                    <Divider />
                                    <Typography component="p" >Author ID: {userInfo.uid}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    )
}

export default Orders
