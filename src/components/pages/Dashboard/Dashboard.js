import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { updateName } from "../../../store/actions/name";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function Welcome(props) {
  const { classes, name, dispatch } = props;
  function changeName(event) {
    dispatch(updateName(event.target.value));
  }
  return (
    <Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="display1" gutterBottom component="h2">
          Welcome
        </Typography>
        <Typography
          style={{ color: "#3f51b5" }}
          variant="headline"
          component="h2"
        >
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
      </Paper>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  name: state.name
});

export default connect(mapStateToProps)(withStyles(styles)(Welcome));
