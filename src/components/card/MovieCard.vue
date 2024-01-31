<script setup>
// define props
import { defineProps } from 'vue';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col items-start justify-start cursor-pointer">
    <img
      v-bind:src="imageUrl"
      v-bind:alt="title"
      class="h-[160px] w-[285px] rounded-sm object-cover"
    />
  </div>
</template>
