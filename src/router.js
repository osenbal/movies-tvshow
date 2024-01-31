import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.page.vue';
import DetailMovie from './pages/movie/DetailMovie.page.vue';
import Search from './pages/Search.page.vue';
import Watchlist from './pages/Watchlist.page.vue';

const routes = [
  {
    path: '/',
    component: Home,
    props: (route) => ({
      rt: route.query?.request_token,
      approved: route.query?.approved === 'true',
    }),
  },
  {
    path: '/search',
    component: Search,
    props: (route) => ({ query: route.query?.q }),
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: Watchlist,
  },
  {
    path: '/movie/:id',
    name: 'detail-movie',
    component: DetailMovie,
    props: (route) => ({
      rt: route.query?.request_token,
      approved: route.query?.approved === 'true',
    }),
  },
  {
    path: '/tv/:id',
    name: 'detail-tv',
    component: DetailMovie,
    props: (route) => ({
      rt: route.query?.request_token,
      approved: route.query?.approved === 'true',
    }),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
