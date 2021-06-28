import React from 'react';
import Container from "@material-ui/core/Container";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import api from "./service/Service";
import { useEffect } from "react";
import { useStateValue } from "../StateProvider";
import veterinarios from "../veterinario";

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

export default function NewCita(){

    const [{ basket, user }, dispatch] = useStateValue();
    const classes = useStyles();
    const [cliente, setCliente] = useState("");
    const [mascota, setMascota] = useState("");
    const [veterinario, setVeterinario] = useState("");
    const [vet, setVet] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [idCliente, setIdCliente] = useState("");
    //const [mascotal, setMascotal] = useState([]);
    const [mascotita, setMascotita] = useState("");
    const [masco, setMasco] = useState([]);
    const [data, setData] = useState([]);
    const history = useHistory();

    //const mascotal={mascotal:[{idMascota: 5, nombre: "oooooo"},{idMascota: 6, nombre: "perro"}]};
    
    useEffect(() => {
        if(user){
        dataCliente();
        }else{
            history.push("/")
        }
      }, []);

    const registrarCita= (e) => {
        console.log("pasa dentro mascota");
        api.post("/cita/save",{
            "idCliente": idCliente,
            "mascotaa": mascotita,
            "veterinario": vet,
            "fecha": fecha,
            "hora": hora
        })
            .then(res => {  
                window.alert("Cita creada");
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
                 setData(res.data);
                 console.log(res);
                 setCliente(res.data.nombres);
                 console.log(cliente);
                 setIdCliente(res.data.id);
                 dataMascota(res.data.id)
              })
              .catch(error=>{
                  console.log("Error")
              })
      }

      const dataMascota=(e) =>{

        api.get("/mascota/idcliente/"+e)
             .then(res => {             
                 console.log(res);
                 //setMascotal(res.data);
                 setMasco(res.data)
                 //console.log(mascotal);
              })
              .catch(error=>{
                  console.log("Error")
              })

      }

      const handleChange = (event) => {
            console.log(event)
            setMascotita(event.target.value);
      };

      const handleChange2 = (event) => {
        console.log(event)
        setVet(event.target.value);
  };


    return (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Registrar nueva cita
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    autoComplete='cliente'
                    name='cliente'
                    variant='outlined'
                    required
                    fullWidth
                    id='cliente'
                    label='cliente'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                    <Select onChange={handleChange}>
                        {masco.map(x => <MenuItem key={x.idMascota} value={x.nombre} primaryText={x.nombre}>{x.nombre} </MenuItem>)}
                    </Select>
                </Grid>
                
                <Grid item xs={12}>
                    <Select onChange={handleChange2}>
                        {veterinarios.map(x => <MenuItem key={x.id} value={x.name} primaryText={x.name}>{x.name} </MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    variant='outlined'
                    required
                    fullWidth
                    id='fecha'
                    label='Fecha(yyyy-mm-dd)'
                    name='fecha'
                    autoComplete='fecha'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    variant='outlined'
                    required
                    fullWidth
                    id='hora'
                    label='Hora'
                    name='hora'
                    autoComplete='hora'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={registrarCita}
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