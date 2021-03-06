import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Chart from "chart.js";
import { connect } from "react-redux";
import { updateName } from "../../../store/actions/name";
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

function Welcome(props) {
  const { classes, name, dispatch } = props;
  const [surveyModusData] = useState({
    labels: [],
    datasets: []
  });
  const [items, setItems] = useState([]);
  const [selectValue, setSelectValue] = useState({
    items: "",
    quality: ""
  });

  useEffect(() => {
    getItems().then(res => setItems(res.content));
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://34.87.100.80:15674/ws");
    const Stomp = window.Stomp;
    const client = Stomp.over(ws);
    const color = window.Chart.helpers.color;

    client.debug = function() {
      if (window.console && console.log && console.log.apply) {
        console.log.apply(console, arguments);
      }
    };

    const onConnect = function() {
      client.subscribe(
        "/exchange/survey-modus-exc/surveys.modus",
        function(d) {
          let payload = JSON.parse(d.body);
          window.surveyModusBar.clear();
          let newSurveyModusDataset = {
            label: "Survey Modus",
            backgroundColor: color("#dd3333")
              .alpha(0.5)
              .rgbString(),
            borderColor: "#dd3333",
            borderWidth: 1,
            data: []
          };

          surveyModusData.labels.length = 0;
          surveyModusData.datasets.length = 0;

          payload.forEach(item => {
            surveyModusData.labels.push(`${item.barang} ${item.kualitas}`);
            newSurveyModusDataset.data.push(item.jumlah);
          });

          surveyModusData.datasets.push(newSurveyModusDataset);
          window.surveyModusBar.update();
        },
        { ack: "auto" }
      );
    };

    const onError = function() {
      console.log("error");
    };

    client.connect("admin", "admin", onConnect, onError, "/");
  }, []);

  useEffect(() => {
    let surveyModusCtx = document
      .getElementById("chart-survey-modus")
      .getContext("2d");
    window.surveyModusBar = new Chart(surveyModusCtx, {
      type: "bar",
      data: surveyModusData,
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
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

  function changeName(event) {
    dispatch(updateName(event.target.value));
  }
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h4" gutterBottom component="h2">
        Welcome
      </Typography>
      <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2">
        {name}
      </Typography>
      <TextField
        id="standard-name"
        label="Name"
        value={name}
        margin="normal"
        onChange={changeName}
      />
      <Divider />
      <Typography style={{ marginTop: 50 }} variant="h4" component="h2">
        Submit Survey
      </Typography>
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
      <Divider />
      <Typography
        style={{ marginTop: 50 }}
        variant="h4"
        gutterBottom
        component="h2"
      >
        Survey Product
      </Typography>
      <canvas
        id="chart-survey-modus"
        style={{
          height: 180,
          width: 657
        }}
        height="360"
        width="1314"
      />
    </Paper>
  );
}

const mapStateToProps = state => ({
  name: state.name
});

export default connect(mapStateToProps)(withStyles(styles)(Welcome));
