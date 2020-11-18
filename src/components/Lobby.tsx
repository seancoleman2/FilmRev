import React, { ChangeEvent, FormEvent } from 'react';
import { makeStyles, Typography, Container, Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
  background: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(40, 42, 43)',
    height: '100%',
    padding: "50px"
  }, 
  grid: {
    background: "#FF5B40"
  }, 
  text: {
    marginBottom: "15px"
  }
})

interface LobbyScreenProps {
  username: string;
  roomName: string;
  setUsername: (name:string) => void;
  setRoomName: (roomName:string) => void; 
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}


export default function Lobby ({username, roomName, setUsername, setRoomName, handleSubmit}: LobbyScreenProps) {
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
        <Grid container spacing={4} alignItems="center" justify="center"> 
          <Grid item xs={4} > 
            <Typography variant="h4" className={classes.text}> 
                FilmRev
            </Typography>
            <Typography variant="h6"> 
                Up your game with private film review sessions with our dedicated experts. 
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid item xs = {8} > 
              <Typography variant="h6">
                  Enter your room details to proceed 
              </Typography>
                  <TextField 
                      id="input-user-name" 
                      label="Your Name" 
                      value={username}
                      onChange={handleNameChange}
                  />
                  <TextField 
                      id="input-room-name" 
                      label="Room Name" 
                      value={roomName}
                      onChange={handleRoomNameChange}
                  />
              <Grid container justify="flex-end">
              <Button
                  variant="contained"
                  type="submit"
                  color="primary"
              >
                  Continue
              </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  );
};
  
