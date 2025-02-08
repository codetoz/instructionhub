import apiClient from '../apiClient';
import { Instruction, InstructionType } from './types';

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
