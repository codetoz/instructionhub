import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
  RouterNavigateOptions,
} from 'react-router-dom';
import { authenticateUser } from '../logic/auth/service';
import LoadingPage from '../pages/LoadingPage/LoadingPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import InstructionDetailsPage from '../pages/InstructionDetailsPage/InstructionDetailsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import Layout from './Layout';

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

export const getLocation = () => {
  return router.state.location;
};

export const navigate = (to: string, opts?: RouterNavigateOptions) => {
  router.navigate(to, opts);
};

export function setSearchParam(name: string, value: string) {
  const location = getLocation();
  const searchParams = new URLSearchParams(location.search);
  searchParams.set(name, value);
  navigate(location.pathname + '?' + searchParams.toString());
}

export function deleteSearchParam(name: string, opts?: RouterNavigateOptions) {
  const location = getLocation();
  const searchParams = new URLSearchParams(location.search);
  searchParams.delete(name);
  navigate(location.pathname + '?' + searchParams.toString(), opts);
}

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
