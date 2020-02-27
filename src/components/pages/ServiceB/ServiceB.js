import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function ServiceB(props) {
  const { classes, name } = props;
  const [value, setValue] = useState(0);

  function handleChange(event, value) {
    setValue(value);
  }

  return (
    <Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h4" gutterBottom component="h2">
          Service B
        </Typography>
        <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2">
          {name}
        </Typography>
        <Typography style={{ marginTop: 30 }} component="p">
          this is your home page served by Service B
        </Typography>
        <AppBar style={{ marginTop: 50 }} position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="B - 1 Tab" href={`#tab${value}`} />
            <Tab label="B - 2 Tab" href={`#tab${value}`} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>B - 1 Tab</TabContainer>}
        {value === 1 && <TabContainer>B - 2 Tab</TabContainer>}
      </Paper>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  name: state.name
});

export default connect(mapStateToProps, null)(withStyles(styles)(ServiceB));
