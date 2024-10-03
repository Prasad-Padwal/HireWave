import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/app-layout";
import LandingPage from "./pages/landing";
import Onboarding from "./pages/Onboarding";
import JobListing from "./pages/jobListing";
import PostJobs from "./pages/post-job";
import SaveJobs from "./pages/save-jobs";
import MyJobs from "./pages/my-jobs";
import JobPage from "./pages/job";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: 
            <Onboarding />,
      },
      {
        path: "/jobs",
        element: 
        <JobListing/>
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-jobs",
        element: (
          <ProtectedRoute>
            <PostJobs />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/save-jobs",
        element: (
          <ProtectedRoute>
            <SaveJobs />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
