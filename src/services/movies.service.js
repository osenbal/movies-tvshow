import httpClient from '../utils/httpClient';

export const getPopularMovies = async (
  page,
  lang = 'en-US',
  sort = 'popularity.desc'
) => {
  return httpClient
    .get('/discover/movie', {
      params: {
        page,
        language: lang,
        sort_by: sort,
        include_adult: false,
        include_video: false,
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      return error?.response?.data || error.message;
    });
};

export const getDetailMovie = async (id, lang = 'en-US') => {
  return httpClient
    .get(`/movie/${id}`, {
      params: {
        language: lang,
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      return error?.response?.data || error.message;
    });
};

export const getRecommendationsMovies = async (
  movie_id,
  page = 1,
  lang = 'en-US'
) => {
  return httpClient
    .get(`/movie/${movie_id}/recommendations`, {
      params: {
        page,
        language: lang,
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      return error?.response?.data || error.message;
    });
};
