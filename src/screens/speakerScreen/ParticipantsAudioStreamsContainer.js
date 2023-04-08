import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";

const ParticipantAudioStream = ({ participantId }) => {
  const { micOn, micStream, isLocal } = useParticipant(participantId);
  const audioPlayer = useRef();

  useEffect(() => {
    if (!isLocal && audioPlayer.current && micOn && micStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);

      audioPlayer.current.srcObject = mediaStream;
      audioPlayer.current.play().catch((err) => {
        if (
          err.message ===
          "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
        ) {
          console.error("audio" + err.message);
        }
      });
    } else {
      audioPlayer.current.srcObject = null;
    }
  }, [micStream, micOn, isLocal, participantId]);

  return <audio autoPlay playsInline controls={false} ref={audioPlayer} />;
};

const ParticipantsAudioStreamsContainer = () => {
  const { participants } = useMeeting();

  const participantIds = useMemo(
    () => [...participants.keys()],
    [participants]
  );

  return (
    <>
      {participantIds.map((participantId) => (
        <ParticipantAudioStream {...{ participantId }} />
      ))}
    </>
  );
};

export default ParticipantsAudioStreamsContainer;
