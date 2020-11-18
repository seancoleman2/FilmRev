import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import FilmRoom from './FilmRoom';

const FilmReviewSession = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState<any>(null);

  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    const headers = new window.Headers();
    const params = new window.URLSearchParams({ username, roomName });
    const data = await fetch(`/token?${params}`, { headers }).then(res => res.json());
    setToken(data.token);
  }, [username, roomName]);

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <FilmRoom
        roomName={roomName}
        token = {token}
        handleLogout={handleLogout}
      />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        setUsername={setUsername}
        setRoomName={setRoomName}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default FilmReviewSession;
