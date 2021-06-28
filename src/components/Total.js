import { Button, makeStyles } from "@material-ui/core";
import accounting from "accounting";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
  },
  button: {
    maxWidth: "200px",
    marginTop: "2rem",
  },
}));

const Total = () => {
  const classes = useStyles();
  const [{ basket, user }] = useStateValue();
  const history = useHistory();

  const pagar = () => {
    if(basket.length>0){
      if (user) {
        console.log(user);
        history.push("/checkout");
      }else{
        console.log("Tiene que loguearse")
        history.push("/signin");
      }
    }else{
      window.alert("Agrega productos");
    }
  };

  return (
    <div className={classes.root}>
      <h5>Total productos : {basket?.length}</h5>
      <h5>{accounting.formatMoney(getBasketTotal(basket), "S/.")}</h5>
      <Button
        onClick={pagar}
        className={classes.button}
        variant='contained'
        color='secondary'
      >
        Pagar
      </Button>
    </div>
  );
};

export default Total;