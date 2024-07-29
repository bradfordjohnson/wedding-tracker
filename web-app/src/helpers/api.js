import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'version': '1.0.0'
      }
});

export default api;