import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Dirección de envío
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='firstName'
            name='firstName'
            label='Nombres completos'
            fullWidth
            autoComplete='given-name'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Apellidos completos'
            fullWidth
            autoComplete='family-name'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='address1'
            name='address1'
            label='Dirección 1'
            fullWidth
            autoComplete='shipping address-line1'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='address2'
            name='address2'
            label='Dirección 2'
            fullWidth
            autoComplete='shipping address-line2'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='city'
            name='city'
            label='Ciudad'
            fullWidth
            autoComplete='shipping address-level2'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='state'
            name='state'
            label='Departamento/Provincia/Distrito'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='zip'
            name='zip'
            label='Código postal'
            fullWidth
            autoComplete='shipping postal-code'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='country'
            name='country'
            label='Country'
            fullWidth
            autoComplete='shipping country'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color='secondary' name='saveAddress' value='yes' />
            }
            label='Utilizar esta dirección para los detalles de pago'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
