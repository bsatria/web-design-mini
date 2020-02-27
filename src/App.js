import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./components/commons/AppBar";
import SideBar from "./components/commons/SideBar";
import Welcome from "./components/pages/Dashboard/Dashboard";
import ServiceB from "./components/pages/ServiceB/ServiceB";
import SimpleTable from "./components/pages/Users/Users";
import Login from "./components/pages/Login/Login";

import { getPosts } from "./store/actions/posts";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar
});

class App extends React.Component {
  state = {
    open: true
  };
  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(resp => resp.json())
      .then(data => {
        this.props.getPosts(data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Router>
          <div className={classes.root}>
            <Navbar side={this.state.open} open={this.handleDrawerOpen} />
            <SideBar open={this.state.open} close={this.handleDrawerClose} />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Welcome} />
                <Route path="/nested/" component={ServiceB} />
                <Route path="/list/" component={SimpleTable} />
              </Switch>
            </main>
          </div>
        </Router>
      </Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  getPosts
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App));
