import useSWR from 'swr';
import { fetchInstruction, fetchUserInstructions } from './service';

export function useUserInstructions(userId?: string) {
  return useSWR(`users/instructions/${userId}`, () =>
    fetchUserInstructions(userId),
  );
}

export function useInstruction(userId: string, instructionSlug: string) {
  return useSWR(`users/${userId}/instructions/${instructionSlug}`, () =>
    fetchInstruction(userId, instructionSlug),
  );
}
