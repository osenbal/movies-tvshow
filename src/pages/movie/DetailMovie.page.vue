<script setup>
import { ref, onMounted, defineProps, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  getDetailMovie,
  getRecommendationsMovies,
} from '../../services/movies.service';
import {
  getTvShowDetails,
  getRecommendationsTvShows,
} from '../../services/tvshows.service';
import { IMDB_URL_POSTER, IMDB_URL_BACKDROP } from '../../utils/constants';
import {
  addToWatchlist,
  getSessionId,
  getWatchListMovies,
  getWatchListTvShows,
} from '../../services/account.service';
import MovieDetailCard from '../../components/card/MovieDetailCard.vue';
import MovieCard from '../../components/card/MovieCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
const router = useRouter();

const props = defineProps(['rt', 'approved']);
const movie = ref({
  backdrop_path: '',
  poster_path: '',
  title: '',
  release_date: '',
  genres: [],
  runtime: 0,
  vote_average: 0,
  vote_count: 0,
  tagline: '',
  overview: '',
});
const recommendations = ref([]);
const watchlist = ref(false);
const isTvShow = router.currentRoute.value.path.includes('tv');

const swiperOptions = {
  spaceBetween: 5,
  breakpoints: {
    0: { slidesPerView: 3, spaceBetween: 8 },
    768: { slidesPerView: 4, spaceBetween: 5 },
    1024: { slidesPerView: 5, spaceBetween: 5 },
    1280: { slidesPerView: 7, spaceBetween: 5 },
  },
};

const showRecommendation = computed(
  () => movie.value.vote_average > 8 && movie.value.vote_count > 1000
);
const setTitle = (pageTitle) => {
  document.title = pageTitle + ' | Movie App';
};

const updateWatchlist = async () => {
  const res = isTvShow
    ? await getWatchListTvShows()
    : await getWatchListMovies();

  watchlist.value = res.results.some((item) => item?.id === movie.value?.id);
};

const handleAddToWatchlist = async () => {
  await addToWatchlist(
    isTvShow ? 'tv' : 'movie',
    movie.value.id,
    !watchlist.value
  ).then(() => {
    const sessionId = localStorage.getItem('session_id');

    if (!sessionId) {
      return;
    }
    watchlist.value = !watchlist.value;
  });
};

const handleGetDetail = async () => {
  const urlPath = router.currentRoute.value.path;
  let res = null;

  if (urlPath.includes('movie')) {
    setTitle('Movie Detail');
    res = await getDetailMovie(router.currentRoute.value.params.id);
  } else if (urlPath.includes('tv')) {
    setTitle('TV Show Detail');
    res = await getTvShowDetails(router.currentRoute.value.params.id);
  } else {
    setTitle('Detail');
  }

  movie.value = res;
  updateWatchlist();
};

const handleGetRecommendations = async () => {
  if (showRecommendation.value) {
    const urlPath = router.currentRoute.value.path;
    let res = null;

    if (urlPath.includes('movie')) {
      res = await getRecommendationsMovies(router.currentRoute.value.params.id);
    } else if (urlPath.includes('tv')) {
      res = await getRecommendationsTvShows(
        router.currentRoute.value.params.id
      );
    }

    recommendations.value = res.results;
  }
};

onMounted(async () => {
  window.scrollTo(0, 0);

  if (props?.rt && props?.approved) {
    await getSessionId(props.rt);
  }

  handleGetDetail().then(() => {
    handleGetRecommendations();
  });
});

watch(
  () => router.currentRoute.value.params.id,
  () => {
    handleGetDetail();
    handleGetRecommendations();
  }
);
</script>

<template>
  <div class="flex flex-col min-h-[100vh]">
    <MovieDetailCard
      :backdropUrl="IMDB_URL_BACKDROP + movie.backdrop_path"
      :posterUrl="IMDB_URL_POSTER + movie.poster_path"
      :title="isTvShow ? movie.name : movie.title"
      :releaseDate="isTvShow ? movie.first_air_date : movie.release_date"
      :genres="movie.genres"
      :runtime="isTvShow ? 0 : movie.runtime"
      :voteAverage="movie.vote_average"
      :voteCount="movie.vote_count"
      :tagline="movie.tagline"
      :overview="movie.overview"
      :isAddedToWatchlist="watchlist"
      :handleAddToWatchlist="handleAddToWatchlist"
    />
    <div
      v-if="showRecommendation"
      class="flex flex-col gap-4 text-white px-2 md:px-16 mt-8"
    >
      <p class="font-medium text-xl">RECOMMENDATION</p>

      <div class="flex flex-row items-start justify-start">
        <swiper
          :breakpoints="swiperOptions.breakpoints"
          :class="'flex flex-row gap-5 w-full'"
        >
          <swiper-slide
            v-for="recommendation in recommendations"
            :key="recommendation.id"
          >
            <router-link
              :to="{
                name:
                  recommendation?.media_type === 'tv'
                    ? 'detail-tv'
                    : 'detail-movie',
                params: { id: recommendation?.id },
              }"
            >
              <MovieCard
                :imageUrl="IMDB_URL_POSTER + recommendation.poster_path"
                :title="
                  recommendation?.media_type === 'tv'
                    ? recommendation.name
                    : recommendation.title
                "
              />
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
