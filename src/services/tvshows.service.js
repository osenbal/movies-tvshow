import httpClient from '../utils/httpClient';

export const getPopularTvShows = async (
  page,
  lang = 'en-US',
  sort = 'popularity.desc'
) => {
  return httpClient
    .get('/discover/tv', {
      params: {
        page,
        language: lang,
        sort_by: sort,
        include_adult: false,
        include_null_first_air_dates: false,
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      return error?.response?.data || error.message;
    });
};

export const getTvShowDetails = async (id, lang = 'en-US') => {
  return httpClient
    .get(`/tv/${id}`, {
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

export const getRecommendationsTvShows = async (
  tvshow_id,
  page = 1,
  lang = 'en-US'
) => {
  return httpClient
    .get(`/tv/${tvshow_id}/recommendations`, {
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
