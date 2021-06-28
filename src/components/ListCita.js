import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import './css/ListCita.css';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import api from "./service/Service";
import { useStateValue } from "../StateProvider";


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

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


  export default function ListCita(){

    var columns = [
        {title: "Número de cita", field: "idCita"}, // , hidden: true
        {title: "Cliente", field: "clientec.nombres" },
        {title: "Mascota", field: "mascotaa"},
        {title: "Veterinario", field: "veterinario"},
        {title: "Fecha", field: "fecha"},
        {title: "Hora", field: "hora"}
      ]

    const [{ basket, user }, dispatch] = useStateValue();
    const [citas, setCitas] = useState([]); //table citas
    const [idCliente, setIdCliente] = useState("");

     useEffect(() => { 
        dataCliente();
        api.get("/cita/idcliente/"+idCliente)
              .then(res => {               
                  setCitas(res.data)
               })
               .catch(error=>{
                   console.log("Error")
               })
      }, [])
      


      const dataCliente=(e) =>{
        api.get("/cliente/correo/"+user.email)
             .then(res => {               
                 console.log(res);
                 setIdCliente(res.data.id);
                 console.log(res.data.id);
              })
              .catch(error=>{
                  console.log("Error")
              })
      }

      
      

      return (
        <div className="ListCita">
          <Grid container spacing={1}>
              <Grid item xs={6}></Grid>
              <Grid item xs={12}>
                <MaterialTable
                  title="# Lista de citas"
                  columns={columns}
                  data={citas}
                  icons={tableIcons}
                  options={{search:true}}
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
        </div>
      );

  }