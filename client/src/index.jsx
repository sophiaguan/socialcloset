import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Home from "./components/pages/Home";
import MyCloset from "./components/pages/MyCloset";
import AllClothes from "./components/pages/AllClothes";
import MyOutfits from "./components/pages/MyOutfits";
import MyGroups from "./components/pages/MyGroups";
import GroupDetail from "./components/pages/GroupDetail";
import ShareClothes from "./components/pages/ShareClothes";
import AddToGroupCloset from "./components/pages/AddToGroupCloset";
import AllSharedClothes from "./components/pages/AllSharedClothes";
import ImageEdit from "./components/pages/UploadClothes";
import NotFound from "./components/pages/NotFound";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "808705657770-8eqasropsl9hjqg3cvk1fo7t774lcjih.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/my-closet" element={<MyCloset />} />
      <Route path="/all-clothes" element={<AllClothes />} />
      <Route path="/my-outfits" element={<MyOutfits />} />
      <Route path="/friends" element={<MyGroups />} />
      <Route path="/group/:groupName" element={<GroupDetail />} />
      <Route path="/group/:groupName/shared-clothes" element={<AllSharedClothes />} />
      <Route path="/share-clothes" element={<ShareClothes />} />
      <Route path="/add-to-group-closet" element={<AddToGroupCloset />} />
      <Route path="/edit-image" element={<ImageEdit />} />
    </Route>
  )
)

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
