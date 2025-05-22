import React, { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./pages/Layout";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Gym from "./pages/Gym";
import GymOverview from "./pages/GymOverview";
import GymRewards from "./pages/GymRewards";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";

import Loading from "./loading/Loading";

const App = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Overview />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<Loading />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="Gym"
          element={
            <Suspense fallback={<Loading />}>
              <Gym />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <GymOverview />
              </Suspense>
            }
          />
          <Route
            path="points-history"
            element={
              <Suspense fallback={<Loading />}>
                <GymRewards />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="Notifications"
          element={
            <Suspense fallback={<Loading />}>
              <Notifications />
            </Suspense>
          }
        />
        <Route
          path="Settings"
          element={
            <Suspense fallback={<Loading />}>
              <Settings />
            </Suspense>
          }
        />
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};

export default App;
