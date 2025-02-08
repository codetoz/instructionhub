import apiClient from './apiClient';

export async function getInstructions() {
  const response = await apiClient.get('/instructions');
  return response.data;
}

export async function getInstructionById(id: string) {
  const response = await apiClient.get(`/instructions/${id}`);
  return response.data;
}

export async function createInstruction(
  title: string,
  description: string,
  body: string,
  groupId: string,
) {
  const response = await apiClient.post(`/instructions/${groupId}`, {
    title,
    description,
    groupId,
    body,
  });
  return response.data;
}

export async function updateInstruction(
  id: string,
  title: string,
  description: string,
  body: string,
) {
  const response = await apiClient.put(`/instructions/${id}`, {
    title,
    description,
    body,
  });
  return response.data;
}
