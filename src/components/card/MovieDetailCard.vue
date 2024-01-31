<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  backdropUrl: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  voteAverage: {
    type: Number,
    required: true,
  },
  voteCount: {
    type: Number,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  handleAddToWatchlist: {
    type: Function,
    required: true,
  },
  isAddedToWatchlist: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div class="relative w-full lg:h-[600px] h-auto">
    <img
      :src="props?.backdropUrl"
      alt="backdrop"
      class="h-full w-full object-cover object-top"
    />

    <div
      class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
    ></div>

    <div
      class="px-4 lg:px-16 flex flex-col lg:flex-row relative lg:absolute inset-0 items-center justify-center w-full h-full gap-8 py-12 max-w-[1280px] mx-auto mt-[-150px] lg:mt-0"
    >
      <img
        :src="props?.posterUrl"
        :alt="`${props?.title}`"
        class="lg:h-full object-cover object-top rounded-sm lg:w-[320px] md:w-[200px] md:h-[250px] w-[130px] h-[200px]"
      />

      <div class="flex text-white flex-col">
        <p class="text-xl lg:text-4xl font-semibold">
          {{ props?.title }}
          <span
            v-if="props?.releaseDate?.split('-')[0]"
            class="text-neutral-200 font-normal"
            >({{ props?.releaseDate?.split('-')[0] }})</span
          >
        </p>

        <p class="flex flex-col lg:flex-row gap-2 lg:gap-3 mb-4 lg:mb-0">
          <span class="release-date">
            {{ props?.releaseDate?.split('-').join('/') }}
          </span>

          <span class="genres before:content-['•'] after:content-['•']">
            <span v-for="(genre, index) in props?.genres" :key="genre?.id">
              {{ genre?.name
              }}<span v-if="index < props.genres.length - 1">, </span>
            </span>
          </span>

          <span clas="runtime" v-if="props.runtime != 0">
            {{ Math.floor(props?.runtime / 60) }}h {{ props?.runtime % 60 }}m
          </span>
        </p>

        <div class="flex flex-col lg:flex-row gap-6 mt-3 items-center">
          <div class="flex flex-row items-center gap-6">
            <div class="flex flex-col lg:flex-row gap-3 items-center">
              <div
                class="flex flex-row justify-center items-center gap-3 rounded-full w-[60px] border-2 border-white h-[60px] bg-primary-redDark"
              >
                <span>{{ Math.round(props?.voteAverage || 0) * 10 }}%</span>
              </div>

              <span class="font-medium">Vote Average</span>
            </div>

            <div class="flex flex-col lg:flex-row gap-3 items-center">
              <div
                class="flex flex-row justify-center items-center gap-3 rounded-full w-[60px] border-2 border-white h-[60px] bg-primary-redDark"
              >
                <span>{{ Math.round(props?.voteCount || 0) }}</span>
              </div>

              <span class="font-medium">Vote Count</span>
            </div>
          </div>

          <div class="flex flex-row items-center gap-6">
            <div
              class="flex items-center justify-center bg-primary-redDark w-[44px] h-[44px] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 336 272"
                fill="none"
              >
                <path
                  d="M24 24H312M24 136H312M24 248H312"
                  stroke="white"
                  stroke-width="48"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div
              class="flex items-center justify-center bg-primary-redDark w-[44px] h-[44px] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M15 8C8.925 8 4 12.925 4 19C4 30 17 40 24 42.326C31 40 44 30 44 19C44 12.925 39.075 8 33 8C29.28 8 25.99 9.847 24 12.674C22.9857 11.2292 21.6382 10.0501 20.0715 9.23649C18.5049 8.42289 16.7653 7.99875 15 8Z"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div class="relative">
              <div
                class="group cursor-pointer relative inline-block text-center"
              >
                <div
                  @click="handleAddToWatchlist"
                  class="flex items-center justify-center bg-primary-redDark w-[44px] h-[44px] rounded-full cursor-pointer"
                >
                  <svg
                    v-if="props?.isAddedToWatchlist"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 374 512"
                    fill="none"
                  >
                    <path
                      d="M349.9 0H24.1C11.3 0 0.799988 10.4 0.799988 23.3V512L187 325.8L373.2 512V23.3C373.2 10.4 362.8 0 349.9 0Z"
                      fill="white"
                    />
                  </svg>

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 122 158"
                    fill="none"
                  >
                    <path
                      d="M2.70837 155.083V2.79163H119.167V155.083L60.9375 126.985L2.70837 155.083Z"
                      stroke="white"
                      stroke-width="4"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                <div
                  class="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-[-75%] px-3 pointer-events-none"
                >
                  {{ isAddedToWatchlist ? 'Remove from' : 'Add to' }} Watchlist
                  <svg
                    class="absolute text-black h-2 w-full left-0 top-full"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                    xml:space="preserve"
                  >
                    <polygon
                      class="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-center bg-primary-redDark w-[44px] h-[44px] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 256 256"
                fill="none"
              >
                <path
                  d="M237.3 97.9C236.474 95.2772 234.882 92.9615 232.73 91.2507C230.577 89.5399 227.962 88.5123 225.22 88.3L165.76 83.16C165.4 83.1247 165.057 82.9926 164.767 82.7777C164.476 82.5629 164.249 82.2734 164.11 81.94L140.88 26.58C139.804 24.0546 138.01 21.9011 135.72 20.3875C133.43 18.8739 130.745 18.0669 128 18.0669C125.255 18.0669 122.57 18.8739 120.28 20.3875C117.99 21.9011 116.196 24.0546 115.12 26.58L91.89 81.94C91.7508 82.2734 91.5239 82.5629 91.2334 82.7777C90.9429 82.9926 90.5996 83.1247 90.24 83.16L30.78 88.3C28.0385 88.5123 25.4231 89.5399 23.2704 91.2507C21.1176 92.9615 19.5259 95.2772 18.7 97.9C17.8253 100.526 17.7489 103.353 18.4805 106.023C19.212 108.693 20.7187 111.086 22.81 112.9L67.92 152.25C68.1962 152.495 68.4014 152.81 68.514 153.162C68.6266 153.514 68.6425 153.89 68.56 154.25L55 212.76C54.3679 215.454 54.5483 218.275 55.5183 220.866C56.4883 223.457 58.2044 225.703 60.45 227.32C62.6608 228.951 65.3098 229.882 68.0549 229.993C70.8001 230.103 73.5153 229.388 75.85 227.94L126.96 196.94C127.26 196.754 127.607 196.656 127.96 196.656C128.313 196.656 128.66 196.754 128.96 196.94L180.07 227.94C182.429 229.384 185.163 230.097 187.927 229.989C190.691 229.881 193.361 228.957 195.6 227.333C197.839 225.709 199.547 223.458 200.508 220.865C201.469 218.271 201.64 215.451 201 212.76L187.48 154.23C187.398 153.87 187.413 153.494 187.526 153.142C187.639 152.79 187.844 152.475 188.12 152.23L233.23 112.88C235.311 111.063 236.807 108.671 237.531 106.006C238.256 103.34 238.175 100.52 237.3 97.9ZM225.3 103.82L180.19 143.17C178.268 144.842 176.839 147.008 176.056 149.432C175.274 151.857 175.168 154.45 175.75 156.93L189.27 215.46C189.37 215.853 189.348 216.268 189.207 216.648C189.066 217.029 188.812 217.357 188.48 217.59C188.179 217.831 187.81 217.969 187.425 217.986C187.04 218.002 186.66 217.895 186.34 217.68L135.23 186.68C133.051 185.356 130.55 184.655 128 184.655C125.45 184.655 122.949 185.356 120.77 186.68L69.66 217.68C69.3402 217.895 68.9602 218.002 68.5753 217.986C68.1904 217.969 67.8207 217.831 67.52 217.59C67.1878 217.357 66.9343 217.029 66.7932 216.648C66.6521 216.268 66.6301 215.853 66.73 215.46L80.25 156.93C80.8321 154.45 80.7262 151.857 79.9438 149.432C79.1614 147.008 77.7321 144.842 75.81 143.17L30.7 103.82C30.3915 103.558 30.1699 103.208 30.0646 102.817C29.9592 102.426 29.9751 102.012 30.11 101.63C30.211 101.25 30.43 100.911 30.7354 100.663C31.0409 100.415 31.4171 100.271 31.81 100.25L91.28 95.11C93.826 94.8931 96.264 93.9835 98.3299 92.4799C100.396 90.9763 102.011 88.936 103 86.58L126.23 31.22C126.392 30.8764 126.648 30.5859 126.968 30.3824C127.289 30.1789 127.66 30.0708 128.04 30.0708C128.42 30.0708 128.792 30.1789 129.112 30.3824C129.433 30.5859 129.689 30.8764 129.85 31.22L153 86.58C153.986 88.9303 155.595 90.9669 157.653 92.4701C159.712 93.9733 162.141 94.8861 164.68 95.11L224.15 100.25C224.543 100.271 224.919 100.415 225.225 100.663C225.53 100.911 225.749 101.25 225.85 101.63C225.99 102.008 226.012 102.419 225.914 102.81C225.816 103.201 225.602 103.553 225.3 103.82Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>

        <p class="italic text-neutral-300 mt-8">{{ props?.tagline }}</p>

        <div class="overview mt-3">
          <p class="font-medium text-xl">Overview</p>
          <p class="text-neutral-100">{{ props?.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
