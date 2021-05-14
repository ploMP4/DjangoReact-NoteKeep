import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(.8),
  },
}));

const Header = ({ onAdd, showAdd, logout }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} align="center">
        <Typography variant="h3" compact="h3">
          NoteKeep
          <EventNoteIcon fontSize="large" className={classes.margin}/>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} align="center">
        <Button
          variant="contained"
          color={showAdd ? "secondary" : "primary"}
          onClick={onAdd}
          className={classes.margin}
        >
          {showAdd ? "Close" : "Add"}
          {showAdd ? (
            <CloseIcon fontSize="small" className={classes.margin} />
          ) : (
            <NoteAddIcon fontSize="small" className={classes.margin} />
          )}
        </Button>
        <Button onClick={logout} color="secondary" variant="contained" className={classes.margin}>
          Logout 
          <ExitToAppIcon fontSize="small" className={classes.margin}/>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
