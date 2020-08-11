import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../firebase'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box, CircularProgress, Grid, Typography, IconButton, Avatar, CardActions, CardContent, CardMedia, CardHeader, Card, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: theme.palette.secondary,
  },
  margin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function PostList() {
  const classes = useStyles()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    firebase.getPosts().then((snapshot) => setPosts(snapshot.docs))
  }, [])

  const postList = posts.length ? (
    posts.map(post => {
      const data = post.data()

      return (
        <Grid item xs={12} md={4} key={post.id}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  TU
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" disabled>
                  <MoreVertIcon />
                </IconButton>
              }
              title={data.Title}
              subheader={data.subTitle}
            />
            <CardMedia
              className={classes.media}
              image={data.ImageURL}
              title="Cover image"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">{data.Desc}</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">{post.data().Content}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" disabled>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share" disabled>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      )
    })
  ) : (
      <CircularProgress />
    )

  return (
    <Box display="flex" flexWrap="wrap">
      {postList}
      <Link color="primary" href="#" onClick={(e) => e.preventDefault()}>
          See more posts
        </Link>
    </Box>
  )
}