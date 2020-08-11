import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, CssBaseline, Container, Grid, Paper, Box, FormControl, InputLabel, Input, FormHelperText, Button, CircularProgress } from '@material-ui/core'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Title from '../Title'
import firebase from '../../../firebase'

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
    submit: {
        marginRight: theme.spacing(2)
    }
}))

const EditOrder = () => {
    const classes = useStyles()
    const [order, setOrder] = useState()
    const { order_id } = useParams()
    const history = useHistory()

    useEffect(() => {
        firebase.getOrderByID(order_id).then(doc => {
            if(!doc.exists) {
                console.log('No such document!')
            } else {
                setOrder(doc.data())
            }
        }).catch(err => {
            console.log('Error getting document', err)
        })
    }, [order_id])


    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    const handleSubmit = (e) => {
        e.preventDefault()
        setOrder({ ...order, date: new Date() })
        firebase.saveOrder(order_id, order)
        history.push('/dashboard/orders')
    }

    const handleDelete = (e) => {
        e.preventDefault()
        firebase.delOrderById(order_id)
        history.push('/dashboard/orders')
    }

    const showOrder = order ? (
        <form onSubmit={handleSubmit}>
            <Title>Edit Order</Title>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name" required>Name</InputLabel>
                <Input id="name" aria-describedby="name" defaultValue={order.name} onChange={(e) => setOrder({ ...order, name: e.target.value })} />
                <FormHelperText id="name">Name</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="shipTo" required>Location</InputLabel>
                <Input id="shipTo" aria-describedby="shipTo" defaultValue={order.shipTo} onChange={(e) => setOrder({ ...order, shipTo: e.target.value })} />
                <FormHelperText id="shipTo">Insert Location details</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="paymentMethod" required>Payment</InputLabel>
                <Input id="paymentMethod" aria-describedby="paymentMethod" defaultValue={order.paymentMethod} onChange={(e) => setOrder({ ...order, paymentMethod: e.target.value })} />
                <FormHelperText id="paymentMethod">Insert credit card details</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="amount" required>Price</InputLabel>
                <Input id="amount" aria-describedby="amount" type="number" defaultValue={order.amount} onChange={(e) => setOrder({ ...order, amount: e.target.value })} />
                <FormHelperText id="amount">The price of the product</FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" className={classes.submit} color="primary" onClick={handleSubmit}>Save</Button>
            <Button type="submit" className={classes.warning} onClick={handleDelete}>Delete</Button>
        </form>
    ) : (
            <CircularProgress />
        )

    return (
        <div className={classes.root}>
            <Header />
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* New Order */}
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                {showOrder}
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

export default EditOrder
