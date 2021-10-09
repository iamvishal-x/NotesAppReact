import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NoteCard from "../components/NoteCard.js";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((whateverResponseFromJSON) => whateverResponseFromJSON.json())
      .then((whateverDataStoredinJson) => setNotes(whateverDataStoredinJson));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <Container>
      {/* <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} sm={6} md={4} lg={3}>
            <NoteCard propName={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid> */}
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard propName={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
