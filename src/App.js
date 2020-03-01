import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./components/commons/AppBar";
import SideBar from "./components/commons/SideBar";
import Welcome from "./components/pages/Dashboard/Dashboard";
import AddSurvey from "./components/pages/AddSurvey";
import Items from "./components/pages/Items";
import SimpleTable from "./components/pages/Users/Users";

import { getPosts } from "./store/actions/posts";
import { getUsers } from "./api/users";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar
});

function App(props) {
  const { classes, dispatch } = props;

  const [open, setOpen] = useState(true);
  const [refetch] = useState(1);

  useEffect(() => {
    getUsers().then(result => dispatch(getPosts(result)));
  }, [refetch, dispatch]);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Navbar side={open} open={handleDrawerOpen} />
        <SideBar open={open} close={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Route path="/dashboard/" component={Welcome} />
          <Route path="/list/" component={SimpleTable} />
          <Route path="/add-survey/" component={AddSurvey} />
          <Route path="/list-barang/" component={Items} />
        </main>
      </div>
    </Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(App));
