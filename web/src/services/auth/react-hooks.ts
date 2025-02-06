import { useAuthStore } from './store';
import { getUsernameFromEmail } from './helper';

export function useUserName() {
  const user = useAuthStore((state) => state.user);
  if (!user) return '';
  return user.name || user.username || getUsernameFromEmail(user.email);
}
