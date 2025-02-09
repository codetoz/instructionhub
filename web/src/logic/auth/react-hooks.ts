import { useRouteLoaderData } from 'react-router-dom';
import { User } from './types';

export function useClientUser() {
  const { user } = useRouteLoaderData('root') as { user?: User };

  return user;
}
