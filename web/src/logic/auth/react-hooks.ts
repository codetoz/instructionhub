import { useRouteLoaderData } from 'react-router-dom';
import { User } from './types';
import useAuthStore from "./store";

export function useClientUser() {
  return useAuthStore(state=>state.user)

}
