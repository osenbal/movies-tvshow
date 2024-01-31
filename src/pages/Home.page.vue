<script setup>
import { IMDB_URL_POSTER, IMDB_URL_BACKDROP } from '../utils/constants';
import { onMounted, ref, defineProps, computed } from 'vue';
import { getPopularMovies } from '../services/movies.service';
import { getPopularTvShows } from '../services/tvshows.service';
import MovieCard from '../components/card/MovieCard.vue';
import { getSessionId } from '../services/account.service';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const props = defineProps(['rt', 'approved']);
const popularMovies = ref([]);
const popularTvShows = ref([]);
const pagePopularMovies = ref(1);
const pagePopularTvShows = ref(1);
const backgroundKey = ref(0);

const dynamicBackgroundUrl = computed(() => {
  return popularMovies.value[0]?.backdrop_path
    ? `bg-[url('https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/uC9V9D9YtV1ffckyDZSUsdw7fBs.jpg')]`
    : '';
});

const combinedClasses = computed(() => {
  return {
    'bg-cover bg-top xl:h-[810px] md:h-[720px] h-96 before:absolute before:inset-0 before:z-10 bg-overlay relative': true,
    [dynamicBackgroundUrl.value]: true,
  };
});

const swiperOptions = {
  modules: [Navigation],
  spaceBetween: 5,
  slidesPerView: 7,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween: 8,
      navigation: {
        enabled: false,
      },
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 5,
      navigation: {
        enabled: false,
      },
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 5,
      navigation: {
        enabled: true,
      },
    },
    1280: {
      slidesPerView: 7,
      spaceBetween: 5,
      navigation: {
        enabled: true,
      },
    },
  },
};

onMounted(async () => {
  // get session id
  if (props.rt && props.approved) {
    getSessionId(props.rt);
  }

  const res = Promise.all([
    getPopularMovies(pagePopularMovies.value),
    getPopularTvShows(pagePopularTvShows.value),
  ]).then((res) => {
    backgroundKey.value = backgroundKey.value + 1;
    return res;
  });

  popularMovies.value = (await res)[0].results;
  popularTvShows.value = (await res)[1].results;
});
</script>

<template>
  <ul
    class="flex flex-row justify-center items-center gap-8 p-4 md:hidden mt-[50px] absolute w-full z-50"
  >
    <li>
      <router-link class="text-white" to="/tv-shows">TV Shows</router-link>
    </li>

    <li>
      <router-link class="text-white" to="/movies">Movies</router-link>
    </li>

    <li>
      <router-link class="text-white" to="/watchlist">My list</router-link>
    </li>
  </ul>
  <div class="relative">
    <div :class="combinedClasses" :key="backgroundKey">
      <div
        class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
      ></div>
      <div
        class="flex flex-col items-start justify-end md:justify-center h-full md:px-16 px-2 z-20 relative"
      >
        <div class="flex flex-col items-start justify-start">
          <p class="text-xl md:text-4xl font-bold text-white">
            Unlimited movies, TV shows, and more.
          </p>
          <p class="text-base md:text-xl font-semibold text-white mt-4">
            Watch anywhere. Cancel anytime.
          </p>
        </div>

        <div class="flex flex-col items-center justify-center mt-8">
          <router-link to="/register">
            <button
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Started
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="md:ps-16 ps-2">
      <div class="md:mt-[-200px] mt-4 flex flex-col gap-3 z-20 relative">
        <p class="text-xl font-semibold text-white">Popular Movies</p>

        <div class="flex flex-row">
          <swiper
            :modules="swiperOptions.modules"
            :breakpoints="swiperOptions.breakpoints"
            :navigation="{ clickable: true }"
          >
            <swiper-slide v-for="movie in popularMovies" :key="movie?.id">
              <router-link
                :to="{ name: 'detail-movie', params: { id: movie?.id } }"
              >
                <MovieCard
                  :imageUrl="IMDB_URL_POSTER + movie.poster_path"
                  :title="movie?.title"
                />
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <div class="flex flex-col gap-3 relative mt-8">
        <p class="text-xl font-semibold text-white">Popular TV Shows</p>

        <div class="flex flex-row">
          <swiper
            :modules="swiperOptions.modules"
            :breakpoints="swiperOptions.breakpoints"
            :navigation="{ clickable: true }"
          >
            <swiper-slide v-for="tvshow in popularTvShows" :key="tvshow?.id">
              <router-link
                :to="{ name: 'detail-tv', params: { id: tvshow?.id } }"
              >
                <MovieCard
                  :imageUrl="IMDB_URL_POSTER + tvshow?.poster_path"
                  :title="tvshow?.name"
                />
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
