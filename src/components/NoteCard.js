import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DeleteOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, green, pink, yellow, deepOrange } from "@mui/material/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (propName) => {
      if (propName.category === "work") {
        return blue[700];
      }
      if (propName.category === "money") {
        return green[500];
      }
      if (propName.category === "todos") {
        return pink[500];
      }
      return yellow[500];
    },
  },
  highlight: {
    border: (propName) => {
      if (propName.category == "work") {
        return "2px solid yellow";
      }
      if (propName.category == "todos") {
        return "2px solid blue";
      }
      if (propName.category == "money") {
        return "2px solid green";
      }
      return "2px solid red";
    },
  },
});

export default function NoteCard({ propName, handleDelete }) {
  const classes = useStyles(propName);
  return (
    <div>
      <Card elevation={4} className={classes.highlight}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {propName.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => {
                handleDelete(propName.id);
              }}
            >
              <DeleteOutlined />
            </IconButton>
          }
          title={propName.title}
          subheader={propName.category}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {propName.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
