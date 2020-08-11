import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Paper, Avatar, Button } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        marginTop: theme.spacing(2)
    }
}))

function PageNotFound() {
    const classes = useStyles()

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ErrorIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    404 Error
				</Typography>
                <Typography component="h4">
                    the page you are looking for is not found
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                    className={classes.button}
                >
                    Go back to the homepage
                </Button>
            </Paper>
        </main>
    )
}

export default PageNotFound