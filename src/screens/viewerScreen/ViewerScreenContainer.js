import {
  MeetingConsumer,
  Constants,
  MeetingProvider,
} from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { authToken } from "../../utils/api";
import HLSPlayer from "./HLSPlayer";

const ViewerScreenContainer = () => {
  const [name, setName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const { meetingId } = useParams();

  return (
    <div>
      {isInitialized ? (
        <div>
          <MeetingProvider
            token={authToken}
            config={{
              meetingId,
              name,
              micEnabled: false,
              webcamEnabled: false,
              mode: "VIEWER",
            }}
            joinWithoutUserInteraction
          >
            <MeetingConsumer>
              {({ hlsState, hlsUrls }) => {
                const isHlsPlayable =
                  hlsState === Constants.hlsEvents.HLS_PLAYABLE;
                console.log({ isHlsPlayable, hlsUrls });
                return isHlsPlayable ? (
                  <HLSPlayer />
                ) : (
                  <p>Waiting for host to start stream...</p>
                );
              }}
            </MeetingConsumer>
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

export default ViewerScreenContainer;
