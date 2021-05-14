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

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const classes = useStyles();

  useEffect(async () => {
    const res = await fetch("/auth/is-auth/");
    const data = await res.json();

    if (data.auth) {
      history.push("/");
    }
  });

  const loginUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    };

    const res = await fetch("/auth/login/", requestOptions);
    try {
      if (res.ok) {
        history.push("/");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log(error);
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
            <AccountCircleOutlinedIcon fontSize="large" /> Sign In
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
              label="Password"
              type="password"
              variant="outlined"
              className={classes.field}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Fade>
        </CardContent>
        <CardActions>
          <Fade in={ready} timeout={4500}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
              onClick={loginUser}
            >
              LOGIN
            </Button>
          </Fade>
        </CardActions>
      </Card>
      <Typography>
        <Link href="/sign-up">Don't Have an Account? Sign Up.</Link>
      </Typography>
    </Collapse>
  );
};

export default Login;
