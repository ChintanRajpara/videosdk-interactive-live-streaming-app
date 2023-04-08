import React, { useState } from "react";
import { createNewRoom } from "../api";

const WelcomeScreenContainer = ({ setAppData }) => {
  const [meetingId, setMeetingId] = useState("");

  const createClick = async () => {
    const meetingId = await createNewRoom();

    setAppData({ mode: "CONFERENCE", meetingId });
  };
  const hostClick = () => setAppData({ mode: "CONFERENCE", meetingId });
  const viewerClick = () => setAppData({ mode: "VIEWER", meetingId });

  return (
    <div>
      <button onClick={createClick}>Create new Meeting</button>
      <p>{"\n\nor\n\n"}</p>
      <input
        placeholder="Enter meetingId"
        onChange={(e) => setMeetingId(e.target.value)}
        value={meetingId}
      />
      <p>{"\n\n"}</p>
      <button onClick={hostClick}>Join As Host</button>
      <button onClick={viewerClick}>Join As Viewer</button>
    </div>
  );
};

export default WelcomeScreenContainer;
