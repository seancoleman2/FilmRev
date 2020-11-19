import React, { useState, useEffect, useRef } from 'react';
import { Participant, VideoTrack, AudioTrack, VideoTrackPublication, AudioTrackPublication} from 'twilio-video';

interface FilmParticipantProps {
  participant: Participant
}

export default function FilmParticipant ({participant} : FilmParticipantProps) {
  const [videoTracks, setVideoTracks] = useState<VideoTrack[] | []>([]);
  const [audioTracks, setAudioTracks] = useState<AudioTrack[] | []>([]);

  const videoRef = useRef<HTMLVideoElement>(null!);
  const audioRef = useRef<HTMLAudioElement>(null!);

  const trackVideoPubsToTracks = function(trackMap : Map<string, VideoTrackPublication>): VideoTrack[] {
    if (trackMap) {
      return Array.from(trackMap.values()).map(publication => publication.track as VideoTrack).filter(track => track !== null);
    } else {
      return []
    }
  }

  const trackAudioPubsToTracks = function(trackMap : Map<string, AudioTrackPublication>): AudioTrack[] {
    if (trackMap) {
      return Array.from(trackMap.values()).map(publication => publication.track as AudioTrack).filter(track => track !== null);
    } else {
      return []
    }
  }

  useEffect(() => {
    setVideoTracks(trackVideoPubsToTracks(participant.videoTracks));
    setAudioTracks(trackAudioPubsToTracks(participant.audioTracks));

    const trackSubscribed = (track: VideoTrack | AudioTrack) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: VideoTrack | AudioTrack) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
    </div>
  );

}