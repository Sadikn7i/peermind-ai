import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const submitPaperForReview = async (file, persona) => {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('persona', persona);

  const response = await axios.post(`${API_URL}/review`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};