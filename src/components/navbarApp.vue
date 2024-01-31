<script setup>
import LogoApp from './LogoApp.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const isSearch = computed(() => router.currentRoute.value.path === '/search');

const handleSearch = (e) => {
  const searchQuery = e.target?.search?.value;
  if (!searchQuery) return;

  router.push({ path: '/search', query: { q: searchQuery } });
};
</script>

<template>
  <nav
    class="navbar w-full flex flex-row gap-3 justify-between md:px-16 px-4 md:h-[82px] h-[48px] items-center md:bg-neutral-greyDark3 text-white absolute md:relative top-0 z-50"
  >
    <div class="flex flex-row gap-8">
      <div
        class="navbar__logo flex flex-row items-center min-h-[32px] min-w-[18px]"
      >
        <LogoApp />
      </div>
      <div class="navbar__menu md:flex hidden items-center">
        <ul class="flex flex-row gap-4 text-base items-center">
          <li>
            <router-link to="/" class="text-white">Home</router-link>
          </li>
          <li>
            <router-link to="#" class="text-white">TV Shows</router-link>
          </li>
          <li>
            <router-link to="#" class="text-white">Movies</router-link>
          </li>
          <li>
            <router-link to="/watchlist" class="text-white"
              >Watchlist</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar__user flex flex-row gap-5 items-center">
      <form
        @submit.prevent="handleSearch"
        class="flex flex-row"
        v-if="!isSearch"
      >
        <input
          name="search"
          type="text"
          placeholder="Search"
          class="bg-transparent border-none rounded-md px-4 py-2 hidden md:block hover:border-none focus:border-none focus:outline-none"
        />

        <button
          type="submit"
          class="rounded-md px-4 py-2 bg-transparent hidden md:block"
        >
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

      <button class="bg-transparent p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9.99999 20C11.1416 20 12.08 19.1301 12.1887 18.017H7.81128C7.92003 19.1301 8.85835 20 9.99999 20Z"
            fill="white"
          />
          <path
            d="M17.6529 13.5882C16.982 13.5882 16.4382 13.0444 16.4382 12.3735V8.35574C16.4382 5.50652 14.5872 3.08996 12.0222 2.24203C12.0293 2.17324 12.0329 2.10352 12.0329 2.03289C12.0329 0.911953 11.121 0 10 0C8.87907 0 7.96712 0.911953 7.96712 2.03289C7.96712 2.10352 7.97079 2.17324 7.97782 2.24203C5.41286 3.08996 3.56188 5.50652 3.56188 8.35574V12.3735C3.56188 13.0444 3.01802 13.5882 2.34716 13.5882C1.44778 13.5882 0.718719 14.3173 0.718719 15.2167C0.718719 16.1161 1.44782 16.8452 2.34716 16.8452H17.6529C18.5523 16.8452 19.2813 16.1161 19.2813 15.2167C19.2813 14.3173 18.5522 13.5882 17.6529 13.5882ZM10 1.17188C10.4552 1.17188 10.8288 1.52703 10.8588 1.97477C10.5779 1.9373 10.2913 1.91762 10 1.91762C9.70876 1.91762 9.42216 1.9373 9.14118 1.97477C9.17118 1.52703 9.54478 1.17188 10 1.17188V1.17188Z"
            fill="white"
          />
        </svg>
      </button>

      <img
        src="/public/images/thumb_profile.png"
        alt="user"
        class="rounded-md md:w-10 md:h-10 h-8 w-8"
      />
    </div>
  </nav>
</template>
