import React from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import Header from '../Header/Header'
import NewOrder from './NewOrder'
import OrdersList from './OrdersList'
import { makeStyles, Container, Grid, Paper, Box } from '@material-ui/core'
import firebase from '../../../firebase'
import Footer from '../Footer/Footer'

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
    }
}))

const Orders = () => {
    const classes = useStyles()
    const history = useHistory()

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
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                <NewOrder />
                            </Paper>
                        </Grid>
                        {/* All Orders */}
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                <OrdersList />
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
