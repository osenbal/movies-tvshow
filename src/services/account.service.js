import httpClient from '../utils/httpClient';

export const addToWatchlist = async (
  mediaType, // movie or tv
  mediaId, // movie id or tv id
  watchlist // boolean
) => {
  const sessionId = localStorage.getItem('session_id');
  // before we make session request, we need to make sure that the user has a valid session
  // if not, we need to create a new session
  if (!sessionId) {
    // crate request token
    const requestTokenResponse = await httpClient.get(
      '/authentication/token/new'
    );
    const requestToken = requestTokenResponse?.data?.request_token;

    // redirect user to TMDB auth page
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.href}`;

    return;
  } else {
    return httpClient
      .post(
        `/account/${import.meta.env.VITE_VUE_TMDB_ACCOUNT_ID}/watchlist`,
        {
          media_type: mediaType,
          media_id: mediaId,
          watchlist,
        },
        // query params
        {
          params: {
            session_id: sessionId,
          },
        }
      )
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        return error?.response?.data || error.message;
      });
  }
};

export const getSessionId = async (requestToken) => {
  return httpClient
    .post('/authentication/session/new', {
      request_token: requestToken,
    })
    .then((response) => {
      if (response?.data?.session_id) {
        localStorage.setItem('session_id', response.data.session_id);

        // remove all query params
        window.history.replaceState(null, null, window.location.pathname);
      }

      return response?.data;
    })
    .catch((error) => {
      return error?.response?.data || error.message;
    });
};

export const getWatchListMovies = async (page = 1, lang = 'en-US') => {
  const sessionId = localStorage.getItem('session_id');

  return httpClient
    .get(
      `/account/${import.meta.env.VITE_VUE_TMDB_ACCOUNT_ID}/watchlist/movies`,
      {
        params: {
          session_id: sessionId,
          sort_by: 'created_at.asc',
          page,
          language: lang,
        },
      }
    )
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      return error?.response?.data || error.message;
    });
};

export const getWatchListTvShows = async (page = 1, lang = 'en-US') => {
  const sessionId = localStorage.getItem('session_id');

  return httpClient
    .get(`/account/${import.meta.env.VITE_VUE_TMDB_ACCOUNT_ID}/watchlist/tv`, {
      params: {
        session_id: sessionId,
        sort_by: 'created_at.asc',
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
