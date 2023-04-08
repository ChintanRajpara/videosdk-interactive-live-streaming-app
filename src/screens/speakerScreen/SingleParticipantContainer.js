import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useMemo } from "react";
import ReactPlayer from "react-player";

const SingleParticipantContainer = ({ participantId }) => {
  const { micOn, displayName, webcamStream, webcamOn } =
    useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  return (
    <div className="single_participant_container">
      <div>
        <p>name: {displayName}</p>
        <p>webcam: {webcamOn ? "on" : "off"}</p>
        <p>mic: {micOn ? "on" : "off"}</p>
      </div>
      {webcamOn && (
        <ReactPlayer
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"100%"}
          width={"100%"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
};

export default SingleParticipantContainer;
