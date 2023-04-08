import { useMeeting } from "@videosdk.live/react-sdk";
import Hls from "hls.js";
import React, { useEffect, useMemo, useRef } from "react";

const HLSPlayer = () => {
  const { hlsUrls, hlsState } = useMeeting();

  const playerRef = useRef(null);

  const hlsPlaybackHlsUrl = useMemo(() => hlsUrls.playbackHlsUrl, [hlsUrls]);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        autoStartLoad: true,
        defaultAudioCodec: "mp4a.40.2",
      });

      let player = document.querySelector("#hlsPlayer");

      hls.loadSource(hlsPlaybackHlsUrl);
      hls.attachMedia(player);
    } else {
      if (typeof playerRef.current?.play === "function") {
        playerRef.current.src = hlsPlaybackHlsUrl;
        playerRef.current.play();
      }
    }
  }, [hlsPlaybackHlsUrl, hlsState]);

  return (
    <div>
      <video
        ref={playerRef}
        id="hlsPlayer"
        autoPlay={true}
        controls
        style={{ width: "100%", height: "100%" }}
        playsinline
        playsInline
        muted={true}
        playing
        onError={(err) => {
          console.log(err, "hls video error");
        }}
      ></video>
    </div>
  );
};

export default HLSPlayer;
