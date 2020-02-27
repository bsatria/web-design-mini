import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShareIcon from "@material-ui/icons/Share";
import ListIcon from "@material-ui/icons/List";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link style={{ textDecoration: "none" }} to="/dashboard/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: "none" }} to="/nested/">
      <ListItem button>
        <ListItemIcon>
          <ShareIcon />
        </ListItemIcon>
        <ListItemText primary="Nested Fragments" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: "none" }} to="/list/">
      <ListItem button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="List" />
      </ListItem>
    </Link>
  </div>
);
