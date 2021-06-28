import React from 'react';
import Container from "@material-ui/core/Container";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import api from "./service/Service";
import { useEffect } from "react";
import { useStateValue } from "../StateProvider";

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

export default function NewPet(){

    const classes = useStyles();
    const [{ basket, user }, dispatch] = useStateValue();
    const [name, setName] = useState("");
    const [raza, setRaza] = useState("");
    const [sexo, setSexo] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [color, setColor] = useState("");
    const [idCliente, setIdCliente] = useState("");
    const history = useHistory();

    useEffect(() => {
        if(user){
        dataCliente();
        }else{
            history.push("/")
        }
      }, []);

    const registrarPet= (e) => {
        console.log("pasa dentro mascota");
        api.post("/mascota/save",{
            "nombre": name,
            "sexo": sexo,
            "raza": raza,
            "fechaNacimiento": fechaNacimiento,
            "color": color,
            "idCliente": idCliente
      })
            .then(res => {  
                window.alert("Registro exitoso");
              history.push("/");
              console.log(res);             
             })
             .catch(error=>{
                 console.log("Error")
             })
      };

      const dataCliente=(e) =>{

        api.get("/cliente/correo/"+user.email)
             .then(res => {               
                 console.log(res);
                 setIdCliente(res.data.id);
              })
              .catch(error=>{
                  console.log("Error")
              })
      }

    return (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Registrar Nueva Mascota
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='name'
                    name='name'
                    variant='outlined'
                    required
                    fullWidth
                    id='name'
                    label='Nombre'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                    variant='outlined'
                    required
                    fullWidth
                    id='raza'
                    label='Raza'
                    name='raza'
                    autoComplete='raza'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    variant='outlined'
                    required
                    fullWidth
                    id='sexo'
                    label='Sexo (macho - hembra)'
                    name='sexo'
                    autoComplete='sexo'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    variant='outlined'
                    required
                    fullWidth
                    id='fechaNacimiento'
                    label='Fecha nacimiento(yyyy-mm-dd)'
                    name='fechaNacimiento'
                    autoComplete='fechaNacimiento'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    variant='outlined'
                    required
                    fullWidth
                    id='color'
                    label='Color'
                    name='color'
                    autoComplete='color'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={registrarPet}
              >
                Registrarse
              </Button>
            </form>
          </div>
          <Box mt={5}>
          </Box>
        </Container>
      );

}
