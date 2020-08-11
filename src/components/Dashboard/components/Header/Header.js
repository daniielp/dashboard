import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import { AppBar, Toolbar, IconButton, Typography, Badge, Drawer, Divider, List, makeStyles, Menu, MenuItem, Avatar } from '@material-ui/core'
import { mainListItems, secondaryListItems } from './Listitems';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import firebase from '../../../firebase'
import { useHistory } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    avatarBox: {
        marginLeft: theme.spacing(2),
    },
    avatar: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
}))

const Header = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null)
    const [userImage, setUserImage] = useState()
    const history = useHistory()

    useEffect(() => {
        if(firebase.getUserImage()) setUserImage(firebase.getUserImage())
    }, [])

    async function logout() {
        try {
            await firebase.logout()
            history.push('/')
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleProfileMenu = () => {
        setAnchorEl(null)
    }

    const handleDrawer = () => {
        setOpen(!open)
    }



    return (
        <>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Admin Dashboard
          </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <div className={classes.avatarBox}>
                        <Avatar aria-controls="profile-menu" aria-haspopup="true" src={userImage} className={classes.avatar} onClick={handleClick}>DP</Avatar>
                        <Menu
                            id="profile-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleProfileMenu}
                        >
                            <MenuItem component={Link} to="/user">Profile</MenuItem>
                            <MenuItem>My account</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
        </>
    )
}

export default Header
