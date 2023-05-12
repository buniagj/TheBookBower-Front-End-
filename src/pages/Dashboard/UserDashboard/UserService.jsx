const BASE_URL = 'http://localhost:8000';

export async function updateUserProfile(userId, updatedUser) {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // Add this header
    },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }
  const data = await response.json();
  return data;
}
