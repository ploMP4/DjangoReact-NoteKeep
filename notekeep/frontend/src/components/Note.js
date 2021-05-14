import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionActions,
    Typography,
    Divider,
    Button,
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: 20,
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
    },
    heading: {
      fontSize: theme.typography.pxToRem(25),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  
  const Note = ({ note, deleteNote }) => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{note.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{note.description}</Typography>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button size="small" color="secondary" onClick={() => deleteNote(note.id)}>DELETE</Button>
          </AccordionActions>
        </Accordion>
      </div>
    );
  };
  
  export default Note;
  
  