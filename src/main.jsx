import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Home from "./pages/Home.jsx";
import UserStore from "./store/userData.store.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/varify-email", element: <VerifyEmail /> },
  { path: "/home", element: <Home /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserStore>
      <RouterProvider router={router} />
    </UserStore>
    <App />
  </StrictMode>,
);
