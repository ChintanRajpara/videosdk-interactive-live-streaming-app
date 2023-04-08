import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import WelcomeScreenContainer from "./screens/welcomeScreen/WelcomeScreenContainer";
import SpeakerScreenContainer from "./screens/speakerScreen/SpeakerScreenContainer";
import ViewerScreenContainer from "./screens/viewerScreen/ViewerScreenContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreenContainer />,
  },
  {
    path: "/speaker/:meetingId",
    element: <SpeakerScreenContainer />,
  },
  {
    path: "/viewer/:meetingId",
    element: <ViewerScreenContainer />,
  },
]);

root.render(<RouterProvider router={router} />);
