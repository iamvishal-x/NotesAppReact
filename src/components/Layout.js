import { makeStyles } from "@mui/styles";
import React from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import { format } from "date-fns";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CreateOutlined, SubjectOutlined } from "@mui/icons-material";
import { useHistory, useLocation } from "react-router";

// sx prop doesnt work on div, it only work with container or typography
// const myStyles = {
//   pages: {
//     backgroundColor: "red",
//   },
// };

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  //instead of just makeStyles({}) we can make it a function makeStyles= (() => ({})) to get access of theme parameter
  page: {
    background: "#f9f9f9",
    width: "100%",
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
  },
  active: {
    background: "#f4f4f4",
  },
  title: {
    padding: theme.spacing(2),
    // textAlign: "center",
  },
  // appBar: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  // },
  toolbar: theme.mixins.toolbar,
  appBar: {
    width: `calc(100% - ${drawerWidth}px) !important`,
  }, //for somereason without the important flag it wasnt working
  date: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
}));

//if the APPBAR styles isnt working even with important the use sx style
// const styles = {
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//   },
// };
//
//
// Sidebar will map thro this array of objects to display menu items in the sidebar
const menuItems = [
  {
    text: "My Notes",
    icon: <SubjectOutlined color="error" />,
    path: "/",
  },
  {
    text: "Create a Note",
    icon: <CreateOutlined color="success" />,
    path: "/create",
  },
];
export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  return (
    <div className={classes.root}>
      {/* appbar */}
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is{format(new Date(), " do MMMM Y")}
          </Typography>
          <Typography>User Name</Typography>
          <Avatar src="/avatar.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      {/* sidebar */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        PaperProps={{ elevation: 4 }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Notes App
          </Typography>
        </div>
        {/* Listing Menu Items in sidebar */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              selected={location.pathname == item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* to wrap all the children classes under the side and navbar// see app.js to understand */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}{" "}
      </div>
    </div>
  );
}
