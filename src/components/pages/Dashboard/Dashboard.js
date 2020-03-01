import React, { Fragment, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Chart from "chart.js";
import { connect } from "react-redux";
import { updateName } from "../../../store/actions/name";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

function Welcome(props) {
  const { classes, name, dispatch } = props;
  const [surveyModusData] = useState({
    labels: [],
    datasets: []
  });

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

  function changeName(event) {
    dispatch(updateName(event.target.value));
  }
  return (
    <Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h4" gutterBottom component="h2">
          Welcome
        </Typography>
        <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2">
          {name}
        </Typography>
        <Typography style={{ marginTop: 30 }} component="p">
          this is your home page served by Service A
        </Typography>
        <TextField
          id="standard-name"
          label="Name"
          value={name}
          margin="normal"
          onChange={changeName}
        />
        <Typography variant="h4" gutterBottom component="h2">
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
    </Fragment>
  );
}

const mapStateToProps = state => ({
  name: state.name
});

export default connect(mapStateToProps)(withStyles(styles)(Welcome));
