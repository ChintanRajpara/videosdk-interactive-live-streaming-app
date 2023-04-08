import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import React, { useMemo } from "react";

const MediaControlsContainer = () => {
  const { toggleMic, toggleWebcam, startHls, stopHls, hlsState, meetingId } =
    useMeeting();

  const { isHlsStarted, isHlsStopped, isHlsPlayable } = useMemo(
    () => ({
      isHlsStarted: hlsState === Constants.hlsEvents.HLS_STARTED,
      isHlsStopped: hlsState === Constants.hlsEvents.HLS_STOPPED,
      isHlsPlayable: hlsState === Constants.hlsEvents.HLS_PLAYABLE,
    }),
    [hlsState]
  );

  const _handleToggleHls = () => {
    if (isHlsStarted) {
      stopHls();
    } else if (isHlsStopped) {
      startHls({ quality: "high" });
    }
  };

  return (
    <div>
      <p>MeetingId: {meetingId}</p>
      <p>HLS state: {hlsState}</p>
      {isHlsPlayable && <p>Viewers will now be able to watch the stream.</p>}
      <button onClick={toggleMic}>Toggle Mic</button>
      <button onClick={toggleWebcam}>Toggle Webcam</button>
      <button onClick={_handleToggleHls}>
        {isHlsStarted ? "Stop Hls" : "Start Hls"}
      </button>
    </div>
  );
};

export default MediaControlsContainer;
