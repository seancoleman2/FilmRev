const express = require('express');
const app = express();
const path = require('path');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
require('dotenv').config();

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/token', (req, res) => {
  const { username, roomName } = req.query;
  const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
    ttl: MAX_ALLOWED_SESSION_DURATION,
  });
  token.identity = username;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
  console.log(token.toJwt());
  console.log(`issued token for ${username} in room ${roomName}`);
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(8081, () => console.log(`token server running on 8081`));