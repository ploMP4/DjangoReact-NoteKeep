import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  },
}));

const AddNote = ({ addNote, username }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    addNote({ title, description, username });

    setTitle("");
    setDesc("");
  }

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <TextField
        id="Title"
        label="Title"
        variant="filled"
        margin="normal"
        value={title}
        fullWidth={true}
        required 
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        multiline
        rows={4}
        label="Description"
        variant="filled"
        margin="dense"
        value={description}
        fullWidth={true}
        required
        onChange={(e) => setDesc(e.target.value)}
      />
      <Button className={classes.margin} variant="contained" fullWidth={true} type="submit">
        Save Note
      </Button>
    </form>
  );
};

export default AddNote;
