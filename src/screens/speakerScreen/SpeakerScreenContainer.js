import { MeetingProvider } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { authToken } from "../../utils/api";
import MediaControlsContainer from "./MediaControlsContainer";
import ParticipantsAudioStreamsContainer from "./ParticipantsAudioStreamsContainer";
import ParticipantsGridContainer from "./ParticipantsGridContainer";

const SpeakerScreenContainer = () => {
  const [name, setName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const { meetingId } = useParams();

  return (
    <div>
      {isInitialized ? (
        <div>
          <MeetingProvider
            token={authToken}
            config={{ meetingId, name, micEnabled: true, webcamEnabled: true }}
            joinWithoutUserInteraction
          >
            <ParticipantsAudioStreamsContainer />
            <MediaControlsContainer />
            <ParticipantsGridContainer />
          </MeetingProvider>
        </div>
      ) : (
        <div>
          <input
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              setIsInitialized(true);
            }}
          >
            Join
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeakerScreenContainer;
