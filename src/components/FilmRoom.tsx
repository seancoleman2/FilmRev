import React, { useState, useEffect, MouseEvent } from "react";
import EventEmitter from "events";
import Video, {
  Room,
  LocalParticipant,
  RemoteParticipant,
  LocalVideoTrack,
  Participant,
} from "twilio-video";
import { makeStyles, Typography, Box, Grid } from "@material-ui/core";
import FilmParticipant from "./FilmParticipant";
import { VideoRoomMonitor } from "@twilio/video-room-monitor";

const useStyles = makeStyles({
  session: {
    padding: "15px",
  },
  gridContainer: {
    marginTop: 5,
  },
  localParticipant: {},
  remoteParticipants: {},
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
      <Typography variant="h4">Room: {room.name}</Typography>
      <button onClick={handleLogout}>Leave</button>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={8}>
          <Box bgcolor="secondary.main" height="100%">
            Film Media
          </Box>
        </Grid>
        <Grid item xs={4}>
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
            <h3>Remote Participants</h3>
            <div className={classes.remoteParticipants}>
              {console.log(remoteFilmParticipants)}
              {remoteFilmParticipants.length > 0 ? remoteFilmParticipants : []}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
