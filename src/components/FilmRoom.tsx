import React, {useState, useEffect, MouseEvent } from 'react';
import EventEmitter from 'events';
import Video, {Room, LocalParticipant, RemoteParticipant, LocalVideoTrack, Participant } from 'twilio-video';
import FilmParticipant from './FilmParticipant'; 

interface FilmRoomScreenProps {
  roomName: string;
  token: string;
  handleLogout: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function FilmRoom ({roomName, token, handleLogout}: FilmRoomScreenProps) {
  const [room, setRoom] = useState<Room>(new EventEmitter() as Room); 
  const [participants, setParticipants] = useState([new EventEmitter() as RemoteParticipant]);
  const [localParticipant, setLocalParticipant] = useState(new EventEmitter() as LocalParticipant);
  
  useEffect(() => {
    const participantConnected = (participant: RemoteParticipant) =>
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    const participantDisconnected = (participant: RemoteParticipant) =>
      setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));

    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      setLocalParticipant(room.localParticipant)
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
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

  const remoteParticipants = participants.map(participant => (
    <FilmParticipant 
      key={participant.sid} 
      participant = {participant}
    />
  )); 

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {room ? (
          <FilmParticipant 
            key={localParticipant.sid}
            participant = {localParticipant}
          />
        ) : (
          ''
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};