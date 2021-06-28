import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/logoCuyoPe.png"
import { Badge, Button } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useStateValue } from "../StateProvider";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { actionTypes } from "../reducer";
import './css/Navbar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
      backgroundColor: "rgb(4, 156, 161)",
      boxShadow: "none",
  },
  grow:{
      flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(5),
  },
  image: {
    marginRight: "10px",
  },
}));

const Navbar = () => {
    const classes = useStyles();
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
  
    const handleAuth = () => {
      if (user) {
        console.log(user);
        auth.signOut();
        dispatch({
          type: actionTypes.EMPTY_BASKET,
          basket: [],
        });
        history.push("/");
      }
    };

    const registerPet= () => {
      if (user) {
        history.push("/new-pet");
      }else{
        window.alert("Necesita iniciar sesión");
        history.push("/signin");
      }
    };

    const registerCita= () => {
      if (user) {
        history.push("/new-cita");
      }else{
        window.alert("Necesita iniciar sesión");
        history.push("/signin");
      }
    };

    const ListCita= () => {
      if (user) {
        history.push("/list-cita");
      }else{
        window.alert("Necesita iniciar sesión");
        history.push("/signin");
      }
    };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Link to="/">
                <IconButton>
                <img 
                src={logo}
                alt='CuyoPe.js' 
                height='45px'
                className={classes.image}
                />
                </IconButton>
            </Link>
    <div className={classes.grow} />
          <Link to="/" className='nav-links' >
                Home
            </Link>
            <Link onClick={registerPet} className='nav-links' >
                Registrar mascota
            </Link>
            <Link onClick={registerCita} className='nav-links' >
                Nueva cita
            </Link>
            <Link onClick={ListCita} className='nav-links' >
                Lista de citas
            </Link>
            <Link to="/products" className='nav-links'>
                PetShop
            </Link>
          <Typography variant='h6' color='#fff' component='p'>
            Hola {user ? user.displayName : "Amigo"}
          </Typography>
          <div className={classes.button}>
            <Link to={!user && "/signin"}>
              <Button onClick={handleAuth} variant='outlined'>
                <strong>{user ? "Cerrar sesión" : "Iniciar sesión"}</strong>
              </Button>
            </Link>

            <Link to='/checkout-page'>
              <IconButton aria-label='show cart items' color='inherit'>
                <Badge badgeContent={basket?.length} color='secondary'>
                  <ShoppingCart fontSize='large' color='primary' />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;