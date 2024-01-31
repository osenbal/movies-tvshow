<script setup>
import WatchlistCard from '../components/card/WatchlistCard.vue';
import { ref, onMounted, watch } from 'vue';
import { getWatchListMovies } from '../services/account.service';
import { IMDB_URL_POSTER } from '../utils/constants';
import { addToWatchlist } from '../services/account.service';
import { getWatchListTvShows } from '../services/account.service';

const watchlist = ref([]);
const mediaType = ref('movie');
const isLoading = ref(true);

const handleChangeMediaType = (type) => {
  mediaType.value = type;
};

const handleGetWatchlistMovies = async () => {
  getWatchListMovies()
    .then((res) => {
      watchlist.value = res?.results || [];
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const handleGetWatchlistTvShows = () => {
  getWatchListTvShows()
    .then((res) => {
      watchlist.value = res?.results || [];
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const handleRemoveFromWatchlist = async (mediaType, mediaId) => {
  try {
    await addToWatchlist(mediaType, mediaId, false).then(() => {
      if (mediaType === 'movie') {
        watchlist.value = watchlist.value.filter((item) => item.id !== mediaId);
      } else if (mediaType === 'tv') {
        watchlist.value = watchlist.value.filter((item) => item.id !== mediaId);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

watch(mediaType, () => {
  if (mediaType.value === 'movie') {
    handleGetWatchlistMovies();
  } else if (mediaType.value === 'tv') {
    handleGetWatchlistTvShows();
  }
});

onMounted(() => {
  handleGetWatchlistMovies();
});
</script>
<template>
  <div
    class="w-full min-h-[100vh] md:px-16 px-4 text-white text-xl font-semibold mt-[80px] md:mt-[24px]"
  >
    <div class="flex flex-row items-end gap-6">
      <p>My Watchlist</p>

      <div class="flex flex-row gap-3 text-base font-normal">
        <p
          @click="handleChangeMediaType('movie')"
          :class="{
            'border-b-2 border-white': mediaType === 'movie',
            'cursor-pointer': true,
          }"
        >
          Movies
        </p>
        <p
          @click="handleChangeMediaType('tv')"
          :class="{
            'border-b-2 border-white': mediaType === 'tv',
            'cursor-pointer': true,
          }"
        >
          TV
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-4">
      <div v-if="isLoading" class="flex flex-col items-center justify-center">
        <p class="text-2xl font-semibold">Loading...</p>
      </div>

      <div v-else class="flex flex-row flex-wrap">
        <!-- empty list -->
        <div
          v-if="watchlist?.length === 0"
          class="flex flex-col items-center justify-center w-full text-center"
        >
          <p class="text-2xl font-semibold">Your watchlist is empty</p>
          <p class="text-base font-normal mt-2">
            Add {{ mediaType }} shows to your watchlist to see them here
          </p>
        </div>

        <WatchlistCard
          v-else
          v-for="item in watchlist"
          :key="item.id"
          :id="item.id"
          :mediaType="item.media_type"
          :averageVotes="item.vote_average"
          :posterUrl="IMDB_URL_POSTER + item.poster_path"
          :title="mediaType === 'movie' ? item.title : item.original_name"
          :overview="item.overview"
          :releaseDate="item.release_date"
          :handleRemoveFromWatchlist="
            () => handleRemoveFromWatchlist(mediaType, item.id)
          "
        />
      </div>
    </div>
  </div>
</template>
