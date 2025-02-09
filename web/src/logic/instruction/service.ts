import apiClient from '../apiClient';
import { Instruction, InstructionDetails, InstructionType } from './types';

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
  type = InstructionType.PUBLIC,
  slug,
}: Instruction) {
  const response = await apiClient.post(`/instructions`, {
    title,
    description,
    groupId,
    content,
    type,
    slug,
  });
  return response.data;
}

export async function updateInstruction(
  id: string,
  { title, description, content }: Partial<Instruction>,
) {
  const response = await apiClient.put(`/instructions/${id}`, {
    title,
    description,
    content,
  });
  return response.data;
}

export async function fetchUserInstructions(userId?: string) {
  console.log('fetching user instructions', userId);
  if (!userId) return undefined;
  const response = await apiClient.get<InstructionDetails[]>(
    `/users/${userId}/instructions`,
  );
  console.log(response.data);
  return response.data;
}
