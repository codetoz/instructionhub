import {
  Routes,
  Route,
  createBrowserRouter,
  Outlet,
  LoaderFunctionArgs,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import InstructionDetailsPage from '../pages/InstructionDetailsPage/InstructionDetailsPage';
// import GroupDetailsPage from '../pages/GroupDetailsPage/GroupDetailsPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import TheHeader from '../components/layout/TheHeader';
import { getAuthToken, authenticateUser } from '../logic/auth/service';
import { User } from '../logic/auth/types';
import LoadingPage from '../pages/LoadingPage/LoadingPage';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    loader: async () => {
      await authenticateUser();
      return {};
    },
    hydrateFallbackElement: <LoadingPage />,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      { path: '/instructions/search', Component: SearchPage },
      {
        path: '/:username/:instruction-slug',
        Component: InstructionDetailsPage,
      },
      { path: '/:username', Component: ProfilePage },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <>
      <TheHeader />
      <Outlet />
    </>
  );
}

export default AppRoutes;
