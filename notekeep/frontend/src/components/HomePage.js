import React from "react";
import { useEffect, useState } from "react";
import { Card, Button, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import AddNote from "./AddNote";
import Notes from "./Notes";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    margin: "30px auto",
    overflow: "auto",
    minHeight: 300,
    padding: 30,
    borderRadius: 5,
  },
});

const HomePage = ({ history }) => {
  const classes = useStyles();
  const [showAddNote, setShowAddNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [username, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isAuthenticated = async () => {
      const res = await fetch("/auth/is-auth/");
      const data = await res.json();

      if (!data.auth) {
        history.push("/login");
      }

      setUser(data.username);
    };
    
    const getNotes = async () => {
      const notesFromServer = await fetchNotes();
      setNotes(notesFromServer);
    };

    isAuthenticated();
    getNotes();
    setReady(true);
  }, [username]);

  const fetchNotes = async () => {
    const res = await fetch(`api/get-notes?name=${username}`);
    const data = await res.json();
  
    return data;
  };

  const addNote = async (note) => {
    const res = await fetch("api/add-note/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data = await res.json();

    setNotes([...notes, data]);
  };

  const deleteNote = async (id) => {
    const res = await fetch(`/api/delete-note/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(id),
    });

    res.status === 200
      ? setNotes(notes.filter((note) => note.id !== id))
      : alert("Error Deleting Note");
  };

  const logout = () => {
    fetch("/auth/logout/").then(() => history.push("/login"));
  };

  return (
    <Collapse in={ready} timeout={1500}>
      <Card className={classes.root}>
        <Header
          onAdd={() => {
            setShowAddNote(!showAddNote);
          }}
          logout={logout}
          showAdd={showAddNote}
        />
        <Collapse in={showAddNote} timeout={1000}>
          <AddNote addNote={addNote} username={username} />
        </Collapse>
        {notes.length > 0 ? (
          <Notes notes={notes} deleteNote={deleteNote} />
        ) : (
          "You have no notes"
        )}
      </Card>
    </Collapse>
  );
};

export default HomePage;
