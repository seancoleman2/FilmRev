import React, { ChangeEvent, FormEvent } from "react";
import {
  makeStyles,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  background: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "70%",
    transform: "translate(-50%, -50%)",
    background: "#222C35",
    padding: "50px 50px 25px",
    borderRadius: "5px",
  },
  grid: {
    background: "#FF5B40",
  },
  text: {
    marginBottom: "15px",
  },
  textField: {
    marginBottom: "15px",
    width: "100%",
  },
  button: {
    float: "right",
    marginTop: "10px",
  },
});

interface LobbyScreenProps {
  username: string;
  roomName: string;
  setUsername: (name: string) => void;
  setRoomName: (roomName: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Lobby({
  username,
  roomName,
  setUsername,
  setRoomName,
  handleSubmit,
}: LobbyScreenProps) {
  const classes = useStyles();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <div className={classes.background}>
        <Grid container spacing={4} justify="space-evenly">
          <Grid item xs={6}>
            <Typography className={classes.text} variant="h4">
              FilmRev
            </Typography>
            <Typography variant="h6">
              Level up your game with remote sessions from your favorite players
              and coaches.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="input-user-name"
                label="Your Name"
                value={username}
                className={classes.textField}
                onChange={handleNameChange}
              />
              <TextField
                id="input-room-name"
                label="Film Session Name"
                value={roomName}
                className={classes.textField}
                onChange={handleRoomNameChange}
              />
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                color="primary"
              >
                Continue
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
