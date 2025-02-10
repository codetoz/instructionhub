import { mutate } from 'swr';
import apiClient from '../apiClient';
import { Instruction, InstructionDetails, InstructionType } from './types';
import { getClientUser } from '../auth/service';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import useAuthStore from '../auth/store';

export async function getInstructions() {
  const response = await apiClient.get('/instructions');
  return response.data;
}

export async function getInstructionById(id: string) {
  const response = await apiClient.get(`/instructions/${id}`);
  return response.data;
}

export async function createInstruction({
  groupId,
  description,
  title,
  content,
  type = InstructionType.PRIVATE,
  slug,
}: Instruction) {
  try {
    const response = await apiClient.post(`/instructions`, {
      title,
      description,
      groupId,
      content,
      type,
      slug,
    });
    const clientUser = getClientUser();
    if (clientUser) void mutate(`users/instructions/${clientUser?.id}`);
    return response.data;
  } catch (e: any) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 409) {
        toast.error("You have already created an Instruction with slug 'test'");
      }
    }
    throw e;
  }
}

export async function updateInstruction(
  id: string,
  { title, description, content }: Partial<Instruction>,
) {
  try {
    const response = await apiClient.patch(`/instructions/${id}`, {
      title,
      description,
      content,
    });
    const clientUser = useAuthStore.getState().user;
    mutate(`users/${clientUser?.id}/instructions`);
    toast.success('Instruction edited successfully');
    return response.data;
  } catch (e) {
    toast.error('Failed to edit instruction');
    throw e;
  }
}

export async function deleteInstruction(id: string) {
  try {
    const response = await apiClient.delete(`/instructions/${id}`);
    const clientUser = useAuthStore.getState().user;
    mutate(`users/${clientUser?.id}/instructions`);
    toast.success('Instruction deleted successfully');
    return response.data;
  } catch (e) {
    toast.error('Failed to delete instruction');
    throw e;
  }
}

export async function fetchUserInstructions(userId?: string) {
  if (!userId) return undefined;
  const response = await apiClient.get<InstructionDetails[]>(
    `/users/${userId}/instructions`,
  );
  return response.data;
}

export async function fetchInstruction(
  userId: string,
  instructionSlug: string,
) {
  const response = await apiClient.get<InstructionDetails>(
    `/users/${userId}/instructions/${instructionSlug}`,
  );
  return response.data;
}
