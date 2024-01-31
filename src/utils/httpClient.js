import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_TMDB_API_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: import.meta.env.VITE_VUE_TMDB_API_KEY,
  };
  return config;
});
export default httpClient;
