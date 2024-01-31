<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
  averageVotes: {
    type: Number,
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
  overview: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  handleRemoveFromWatchlist: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col items-center md:flex-row border-2 border-gray-700 rounded-md p-2 md:p-4 mt-4 w-full"
  >
    <div class="relative flex flex-col w-[150px]">
      <img
        :src="posterUrl"
        alt="poster"
        class="rounded-md w-[133px] h-[200px]"
      />
      <div
        class="flex flex-row justify-between md:hidden absolute bottom-0 right-0"
      >
        <div class="flex flex-row gap-3 items-center">
          <div
            class="flex flex-row justify-center items-center gap-3 rounded-full w-[40px] border-2 border-white h-[40px] bg-primary-redDark"
          >
            <p v-if="averageVotes != 0" class="text-xs">
              {{ Math.round(averageVotes * 10) }}%
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col ml-4 flex-1 mt-6 md:mt-0">
      <div class="flex-row justify-between flex">
        <p class="text:lg md:text-xl font-semibold">{{ title }}</p>
        <div class="md:flex hidden flex-row gap-3 items-center">
          <div
            class="flex flex-row justify-center items-center gap-3 rounded-full w-[60px] border-2 border-white h-[60px] bg-primary-redDark"
          >
            <p v-if="averageVotes != 0">{{ Math.round(averageVotes * 10) }}%</p>
          </div>
        </div>
      </div>

      <p class="font-normal text-base">{{ releaseDate }}</p>

      <p class="font-normal text-base mt-3">Overview</p>
      <p
        class="font-normal text-base text-truncate overflow-ellipsis overflow-hidden line-clamp-3"
      >
        {{ overview }}
      </p>

      <div class="flex flex-col md:flex-row mt-4 gap-6">
        <div class="flex flex-row gap-3 items-center">
          <div
            class="flex flex-row items-center justify-center w-[44px] h-[44px] bg-primary-redDark rounded-full"
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

          <span class="text-base font-normal">Your Rating</span>
        </div>

        <div class="flex flex-row gap-3 items-center">
          <div
            class="flex flex-row items-center justify-center w-[44px] h-[44px] bg-primary-redDark rounded-full"
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

          <span class="text-base font-normal">Favorite</span>
        </div>

        <div class="flex flex-row gap-3 items-center">
          <div
            class="flex flex-row items-center justify-center w-[44px] h-[44px] bg-primary-redDark rounded-full"
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

          <span class="text-base font-normal">Add List</span>
        </div>

        <div class="flex flex-row gap-3 items-center cursor-pointer">
          <div
            @click="handleRemoveFromWatchlist"
            class="flex flex-row items-center justify-center w-[44px] h-[44px] bg-primary-redDark rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 97 97"
              fill="none"
            >
              <path
                d="M23.5386 14.6793L48.5 39.6407L73.332 14.8087C73.8805 14.2249 74.5412 13.7578 75.2746 13.4356C76.008 13.1133 76.799 12.9425 77.6 12.9333C79.315 12.9333 80.9599 13.6147 82.1726 14.8274C83.3853 16.0401 84.0666 17.6849 84.0666 19.4C84.0817 20.1928 83.9346 20.9804 83.6344 21.7143C83.3341 22.4482 82.8871 23.1131 82.3206 23.668L57.1653 48.5L82.3206 73.6553C83.3864 74.698 84.0114 76.11 84.0666 77.6C84.0666 79.3151 83.3853 80.9599 82.1726 82.1726C80.9599 83.3854 79.315 84.0667 77.6 84.0667C76.7758 84.1009 75.9536 83.9633 75.1854 83.6627C74.4173 83.3622 73.72 82.9051 73.138 82.3207L48.5 57.3593L23.6033 82.256C23.0569 82.8204 22.4042 83.2709 21.6827 83.5817C20.9613 83.8925 20.1854 84.0573 19.4 84.0667C17.6849 84.0667 16.0401 83.3854 14.8273 82.1726C13.6146 80.9599 12.9333 79.3151 12.9333 77.6C12.9182 76.8072 13.0653 76.0196 13.3656 75.2857C13.6658 74.5518 14.1129 73.8869 14.6793 73.332L39.8346 48.5L14.6793 23.3447C13.6135 22.302 12.9885 20.89 12.9333 19.4C12.9333 17.6849 13.6146 16.0401 14.8273 14.8274C16.0401 13.6147 17.6849 12.9333 19.4 12.9333C20.952 12.9527 22.4393 13.58 23.5386 14.6793Z"
                fill="white"
              />
            </svg>
          </div>

          <span class="text-base font-normal">Remove</span>
        </div>
      </div>
    </div>
  </div>
</template>
