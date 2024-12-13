import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const searchTrips = async (keyword: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trips`, {
      params: { keyword },
    });
    return response.data.trips;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};
