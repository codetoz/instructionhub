import apiClient from './apiClient';

export async function getInstructions() {
  const response = await apiClient.get('/instructions');
  return response.data;
}

export async function getInstructionById(id: string) {
  const response = await apiClient.get(`/instructions/${id}`);
  return response.data;
}