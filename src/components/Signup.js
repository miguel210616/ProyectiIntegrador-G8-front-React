import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import api from "./service/Service";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const history = useHistory();

  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          console.log("pasa a registro")
          registroNombre();
        }
      })
      .catch((err) => alert(err.message));
  };

  const registroNombre = (e) => {
    console.log("pasa dentro");
    console.log(firstName);
    console.log(lastName);
      const userr = auth.currentUser;
            userr.updateProfile({
              displayName: firstName
            }).then(() => {
              registrar();
              console.log("Nombre ingresado");
            }).catch((error) => {
              // An error occurred
              // ...
            });
  };

  const registrar= (e) => {
    console.log("pasa dentro");
    console.log(firstName);
    console.log(lastName);
    api.post("/cliente/save",{
      "apellidos": lastName,
      "nombres": firstName,
      "correo": email,
      "dni": dni,
      "direccion": direccion,
      "celular": celular
  })
        .then(res => {  
          history.push("/");
          console.log(res);             
         })
         .catch(error=>{
             console.log("Error")
         })
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Registrar
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Nombre'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Apellido'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Dirección email'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                variant='outlined'
                required
                fullWidth
                name='dni'
                label='dni'
                type='dni'
                id='dni'
                autoComplete='current-dni'
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                variant='outlined'
                required
                fullWidth
                name='celular'
                label='Celular'
                type='celular'
                id='celular'
                autoComplete='current-celular'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                variant='outlined'
                required
                fullWidth
                name='direccion'
                label='Dirección'
                type='direccion'
                id='direccion'
                autoComplete='current-dni'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={signup}
          >
            Registrarse
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <RouteLink to='/signin'>
                Tienes una cuenta? Iniciar sesión
              </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
