import React, {useState} from 'react'
import { FormControl, InputLabel, Input, FormHelperText, makeStyles, Button } from '@material-ui/core'
import Title from '../Title';
import firebase from '../../../firebase'

const useStyles = makeStyles(theme => ({
    formControl: {
        marginRight: theme.spacing(2)
    }
}))

const NewOrder = () => {
    const classes = useStyles()
    const [order, setOrder] = useState({
        date: new Date()
    })

    const handleSubmit = e => {
        e.preventDefault()
        firebase.createOrder(order)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Title>Create New Order</Title>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name" required>Name</InputLabel>
                <Input id="name" aria-describedby="name" onChange={(e) => setOrder({...order, name: e.target.value})}/>
                <FormHelperText id="name">Name</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="shipTo" required>Location</InputLabel>
                <Input id="shipTo" aria-describedby="shipTo" onChange={(e) => setOrder({...order, shipTo: e.target.value})}/>
                <FormHelperText id="shipTo">Insert Location details</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="paymentMethod" required>Payment</InputLabel>
                <Input id="paymentMethod" aria-describedby="paymentMethod" onChange={(e) => setOrder({...order, paymentMethod: e.target.value})}/>
                <FormHelperText id="paymentMethod">Insert credit card details</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="amount" required>Price</InputLabel>
                <Input id="amount" aria-describedby="amount" type="number" onChange={(e) => setOrder({...order, amount: e.target.value})}/>
                <FormHelperText id="amount">The price of the product</FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </form>
    )
}

export default NewOrder
