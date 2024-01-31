import httpClient from '../utils/httpClient';

export const searchMulti = async (query, page, lang = 'en-US') => {
  return httpClient
    .get('/search/multi', {
      params: {
        query,
        page,
        language: lang,
        include_adult: false,
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      return error?.response?.data || error.message;
    });
};
