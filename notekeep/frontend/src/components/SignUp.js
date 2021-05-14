import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  Button,
  Typography,
  Collapse,
  Fade,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    minHeight: 300,
    padding: 30,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  field: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  button: {
    width: "100%",
  },
}));

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const classes = useStyles();

  useEffect(async () => {
    const res = await fetch("/auth/is-auth/");
    const data = await res.json();

    if (data.auth) {
      history.push("/");
    }
  });

  const createUser = async () => {
    setError("");

    if (pass === confPass) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: pass,
        }),
      };

      const res = await fetch("/auth/create-user/", requestOptions);

      history.push("/");
    } else {
      setError("Passwords do not match");
    }
  };

  $("document").ready(() => {
    setReady(true);
  });

  return (
    <Collapse in={ready} timeout={1500}>
      <Card className={classes.root}>
        <CardContent align="center">
          <Typography variant="h3" component="h3" className={classes.title}>
            <AccountCircleOutlinedIcon fontSize="large" /> Create An Account
          </Typography>
          <Fade in={ready} timeout={3000}>
            <TextField
              required
              label="Email"
              variant="outlined"
              className={classes.field}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Fade>
          <Fade in={ready} timeout={3500}>
            <TextField
              required
              label="UserName"
              variant="outlined"
              className={classes.field}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Fade>
          <Fade in={ready} timeout={4000}>
            <TextField
              required
              error={error ? true : false}
              helperText={error}
              label="Password"
              type="password"
              variant="outlined"
              className={classes.field}
              onChange={(e) => setPass(e.target.value)}
            />
          </Fade>
          <Fade in={ready} timeout={4500}>
            <TextField
              required
              error={error ? true : false}
              helperText={error}
              label="Confirm Password"
              type="password"
              variant="outlined"
              className={classes.field}
              onChange={(e) => setConfPass(e.target.value)}
            />
          </Fade>
        </CardContent>
        <CardActions>
          <Fade in={ready} timeout={6000}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
              onClick={createUser}
            >
              SIGN UP
            </Button>
          </Fade>
        </CardActions>
      </Card>
      <Typography>
        <Link href="/login">Already Have an Account? Go To Login Page.</Link>
      </Typography>
    </Collapse>
  );
};

export default SignUp;
