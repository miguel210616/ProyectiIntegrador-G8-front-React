import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import products from "../product-data";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Products = () => {
    const classes = useStyles();

    console.log("products")

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
          {
              products.map(product =>(
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Product key={product.id} product={product}/>
                </Grid>
              ))
          }
        
      </Grid>
    </div>
  );
};

export default Products;
