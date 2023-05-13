import axios from 'axios';

export async function fetchData() {
  try {
    const response = await axios.get('http://localhost:8000/api/users');
    const userData = response.data;

    const adminResponse = await axios.get('http://localhost:8000/api/admin');
    const adminData = adminResponse.data;


    return { user: userData, admin: adminData };
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}
