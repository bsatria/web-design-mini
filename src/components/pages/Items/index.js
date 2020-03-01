import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { getItems, addItem } from "../../../api/items";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: 30
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

function Items(props) {
  const { classes, name } = props;
  const [items, setItems] = useState([]);
  const [selectValue, setSelectValue] = useState({
    item: ""
  });

  useEffect(() => {
    getItems().then(res => setItems(res.content));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setSelectValue({ [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (selectValue.item) {
      const data = {
        nama: selectValue.item
      };
      addItem(data).then(res => alert("Success submit item"));
    }
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h4" gutterBottom component="h2">
        List Items
      </Typography>
      <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2">
        Nama : {name}
      </Typography>
      <Divider />
      <FormControl className={classes.formControl}>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="item"
            label="Masukan Nama Barang"
            name="item"
            autoFocus
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Item
          </Button>
        </form>
      </FormControl>
    </Paper>
  );
}

const mapStateToProps = state => ({
  name: state.name
});

export default connect(mapStateToProps)(withStyles(styles)(Items));
