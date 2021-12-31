import React, { useState, useEffect, MouseEvent } from "react";
import EventEmitter from "events";
import Video, {
  Room,
  LocalParticipant,
  RemoteParticipant,
  LocalVideoTrack,
  Participant,
} from "twilio-video";
import { makeStyles, Typography, Box, Grid, Button } from "@material-ui/core";
import FilmParticipant from "./FilmParticipant";
import { VideoRoomMonitor } from "@twilio/video-room-monitor";
import ReactPlayer from "react-player";

const useStyles = makeStyles({
  session: {
    padding: "15px",
  },
  gridContainer: {
    marginTop: 5,
  },
  localParticipant: {},
  remoteParticipants: {},
  coachesHeader: {},
  logoutButton: {
    float: "right",
  },
});

interface FilmRoomScreenProps {
  roomName: string;
  token: string;
  handleLogout: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function FilmRoom({
  roomName,
  token,
  handleLogout,
}: FilmRoomScreenProps) {
  const [room, setRoom] = useState<Room>(new EventEmitter() as Room);

  const classes = useStyles();

  const [remoteParticipants, setRemoteParticipants] = useState([
    new EventEmitter() as RemoteParticipant,
  ]);

  const [localParticipant, setLocalParticipant] = useState(
    new EventEmitter() as LocalParticipant
  );

  useEffect(() => {
    const participantConnected = (participant: RemoteParticipant) =>
      setRemoteParticipants((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
    const participantDisconnected = (participant: RemoteParticipant) =>
      setRemoteParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );

    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      setLocalParticipant(room.localParticipant);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
      VideoRoomMonitor.registerVideoRoom(room);
      VideoRoomMonitor.openMonitor();
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            const track = trackPublication.track as LocalVideoTrack;
            track.stop();
          });
          currentRoom.disconnect();
          return new EventEmitter() as Room;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  var remoteFilmParticipants = remoteParticipants.map((participant) =>
    participant.sid ? (
      <FilmParticipant key={participant.sid} participant={participant} />
    ) : null
  );

  return (
    <Box ml={10} mr={10}>
      <Typography variant="h4">Session: {room.name}</Typography>
      <Button
        onClick={handleLogout}
        variant="contained"
        type="submit"
        color="primary"
      >
        Leave
      </Button>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={9}>
          <Box bgcolor="rgb(0,0,0)">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=2Xy7Tl06S3Y"
              width="100%"
              height="720px"
              playing
              controls={false}
              playIcon={<button>Play</button>}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <div className={classes.localParticipant}>
              {room ? (
                <FilmParticipant
                  key={localParticipant.sid}
                  participant={localParticipant}
                />
              ) : (
                ""
              )}
            </div>
            <h3>Players</h3>
            <div className={classes.remoteParticipants}>
              {remoteFilmParticipants.length > 0 ? remoteFilmParticipants : []}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
