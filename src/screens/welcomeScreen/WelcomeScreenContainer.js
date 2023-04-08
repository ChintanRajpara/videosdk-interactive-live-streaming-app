import React from "react";
import { useNavigate } from "react-router-dom";
import { createNewRoom } from "../../utils/api";

const WelcomeScreenContainer = () => {
  const navigate = useNavigate();

  const _handleCreateRoom = async () => {
    const meetingId = await createNewRoom();

    navigate(`/speaker/${meetingId}`);
  };

  return (
    <div>
      <button onClick={_handleCreateRoom}>Create new Room</button>
    </div>
  );
};

export default WelcomeScreenContainer;
