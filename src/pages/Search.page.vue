<script setup>
import { defineProps, onMounted, reactive, watchEffect } from 'vue';
import MovieCard from '../components/card/MovieCard.vue';
import { searchMulti } from '../services/search.service';
import { IMDB_URL_POSTER } from '../utils/constants';
import { useRouter } from 'vue-router';

const props = defineProps(['query']);
const router = useRouter();

const state = reactive({
  searchResult: [],
  searchQuery: '',
});

const handleSearch = async (e) => {
  e.preventDefault();
  const query = e.target?.search?.value;
  if (!query) return;

  router.push({ path: '/search', query: { q: query } });
};

const fetchData = async (query) => {
  try {
    const res = await searchMulti(query);
    state.searchResult = res?.results || [];
  } catch (error) {
    console.error('Error in searchMulti:', error);
  }
};

watchEffect(() => {
  if (props.query) {
    state.searchQuery = props.query;
    fetchData(props.query);
  }
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="min-h-[100vh] md:mt-5 mt-16">
    <form
      @submit.prevent="handleSearch"
      class="flex flex-row justify-center md:px-16 px-2 w-full"
    >
      <input
        v-model="state.searchQuery"
        name="search"
        type="text"
        placeholder="Search"
        class="bg-transparent max-w-[300px] w-full border-none rounded-md md:px-4 px-0 py-2 text-white hover:border-none focus:border-none focus:outline-none"
      />
      <button type="submit" class="rounded-md px-4 py-2 bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_307_264)">
            <path
              d="M19.361 18.2168L14.601 13.2662C15.8249 11.8113 16.4955 9.98069 16.4955 8.07499C16.4955 3.62251 12.873 0 8.42048 0C3.968 0 0.34549 3.62251 0.34549 8.07499C0.34549 12.5275 3.968 16.15 8.42048 16.15C10.092 16.15 11.6849 15.6458 13.0467 14.6888L17.8429 19.677C18.0434 19.8852 18.313 20 18.602 20C18.8755 20 19.1349 19.8957 19.3319 19.7061C19.7504 19.3034 19.7637 18.6357 19.361 18.2168ZM8.42048 2.10652C11.7116 2.10652 14.389 4.78391 14.389 8.07499C14.389 11.3661 11.7116 14.0435 8.42048 14.0435C5.1294 14.0435 2.45201 11.3661 2.45201 8.07499C2.45201 4.78391 5.1294 2.10652 8.42048 2.10652Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_307_264">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </form>

    <div class="flex flex-wrap gap-3 md:px-16 px-2 mt-8 justify-center">
      <div
        v-for="movie in state.searchResult"
        :key="movie?.id"
        class="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 justify-center items-center"
      >
        <router-link
          :to="{
            name: movie?.media_type === 'tv' ? 'detail-tv' : 'detail-movie',
            params: { id: movie?.id },
          }"
        >
          <MovieCard
            :imageUrl="IMDB_URL_POSTER + movie.poster_path"
            :title="movie?.title || movie?.name"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>
