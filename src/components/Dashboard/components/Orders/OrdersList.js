import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import Title from '../Title';
import firebase from '../../../firebase'

function preventDefault(e) {
  e.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [orders, setOrders] = useState([])
  const history = useHistory()

  useEffect(() => {
    firebase.getOrders().then((snapshot) => setOrders(snapshot.docs))
  }, [])

  const ordersList = orders.length ? (
    orders.map(order => {
      const myDate = new Date(order.data().date.seconds * 1000)

      return (
        <TableRow key={order.id}>
          <TableCell onClick={() => history.push(`/dashboard/orders/${order.id}`)}><EditIcon /></TableCell>
          <TableCell>{myDate.toUTCString()}</TableCell>
          <TableCell>{order.data().name}</TableCell>
          <TableCell>{order.data().shipTo} </TableCell>
          <TableCell>{order.data().paymentMethod}</TableCell>
          <TableCell align="right">{order.data().amount}</TableCell>
        </TableRow>
      )
    })
  ) : (
      <TableRow>
        <TableCell>
          <CircularProgress />
        </TableCell>
      </TableRow>
    )


  return (
    <>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Edit</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersList}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </>
  );
}