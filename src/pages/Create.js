import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useHistory } from "react-router";

// USING STYLES INSTEAD OF makeSTYLES, just use "sx = {styles}" whereever you want it to implement
// const styles = {
//   btn: {
//     fontSize: 50,
//     backgroundColor: "green",
//     "&:hover": {
//       background: "lightgreen",
//     },
//   },
//   title: {
//     textDecoration: "underline",
//     marginBottom: 5, //2x8 =16 px for somereason
//   },
// };
////////////////////////////////////////////

const myStyles = {
  field: {
    marginTop: 3,
    marginBottom: 3,
    display: "block",
  },
  btn: {
    fontSize: 20,
    color: "blue",
    backgroundColor: "yellow",
    "&:hover": {
      color: "red",
      backgroundColor: "wheat",
    },
  },
};

export default function Create() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    setTitleError(false);
    if (title == "") {
      setTitleError(true);
    }
    setDetailsError(false);
    if (details == "") {
      setDetailsError(true);
    }
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Typography
        // sx= {styles.title}
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(event) => setTitle(event.target.value)}
          sx={myStyles.field}
          label="Note Title"
          variant="outlined"
          color="success"
          fullWidth
          required
          error={titleError}
        />

        <TextField
          onChange={(event) => setDetails(event.target.value)}
          sx={myStyles.field}
          label="Note Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={5}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl sx={myStyles.field}>
          <FormLabel>Notes Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="todos"
              control={<Radio />}
              label="Todos"
              color="secondary"
            />
            <FormControlLabel
              value="reminder"
              control={<Radio />}
              label="Reminder"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
            <FormControlLabel value="money" control={<Radio />} label="Money" />
          </RadioGroup>
        </FormControl>

        <Button
          sx={myStyles.btn}
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<SendIcon color="error" />}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Click Me
        </Button>
      </form>
    </Container>
  );
}
