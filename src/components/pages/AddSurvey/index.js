import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { getItems } from "../../../api/items";
import { addSurvey } from "../../../api/survey";

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

function AddSurvey(props) {
  const { classes, name } = props;
  const [items, setItems] = useState([]);
  const [selectValue, setSelectValue] = useState({
    items: "",
    quality: ""
  });

  useEffect(() => {
    getItems().then(res => setItems(res.content));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setSelectValue({ ...selectValue, [name]: value });
  }

  function handleSubmit() {
    if (selectValue.items && selectValue.quality) {
      const data = {
        barangId: selectValue.items,
        kualitas: selectValue.quality,
        surveyorId: 1
      };
      addSurvey(data).then(res => alert("Success submit survey"));
    } else {
      alert("Items and Quality must be selected");
    }
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h4" gutterBottom component="h2">
        Add Survey
      </Typography>
      <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2">
        Nama : {name}
      </Typography>
      <Divider />
      <FormControl className={classes.formControl}>
        <InputLabel id="items-label">Items</InputLabel>
        <Select
          labelId="items-label"
          id="items"
          name="items"
          value={selectValue.items}
          onChange={handleChange}
        >
          {items.map(val => (
            <MenuItem key={`item-${val.id}`} value={val.id}>
              {val.nama}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="quality-label">Quality</InputLabel>
        <Select
          labelId="quality-label"
          id="quality"
          name="quality"
          value={selectValue.quality}
          onChange={handleChange}
        >
          <MenuItem value="baik">Baik</MenuItem>
          <MenuItem value="kurang_baik">Kurang Baik</MenuItem>
          <MenuItem value="rusak">Rusak</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Submit Survey
        </Button>
      </FormControl>
    </Paper>
  );
}

const mapStateToProps = state => ({
  name: state.name
});

export default connect(mapStateToProps)(withStyles(styles)(AddSurvey));
