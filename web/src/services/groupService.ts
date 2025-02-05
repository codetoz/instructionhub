import apiClient from './apiClient';

export async function getGroups() {
  const response = await apiClient.get('/groups');
  return response.data;
}

export async function getGroupById(id: string) {
  const response = await apiClient.get(`/groups/${id}`);
  return response.data;
}