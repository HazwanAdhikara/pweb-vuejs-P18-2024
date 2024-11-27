<template>
  <div
    class="group bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
  >
    <div class="relative">
      <img
        :src="book.coverImage || 'https://placehold.co/300x200'"
        :alt="book.title"
        class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
      >
        <span class="text-sm font-medium"
          >Qty: {{ book.qty }}/{{ book.initialQty }}</span
        >
      </div>
    </div>

    <div class="p-5">
      <div class="mb-4">
        <h3 class="text-xl font-bold text-gray-900 line-clamp-1">
          {{ book.title }}
        </h3>
        <p class="text-gray-600 font-medium">{{ book.author }}</p>
      </div>

      <div class="space-y-2 mb-4">
        <div
          class="flex items-start text-sm text-gray-600 border border-gray-300 p-2 rounded"
        >
          <span class="font-medium">Published:</span>
          <span class="ml-2"
            >{{ book.publishedDate }} by {{ book.publisher }}</span
          >
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in book.tags"
            :key="tag"
            class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <RouterLink
        :to="getReadMoreLink(book._id)"
        class="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gray-700 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors duration-300"
      >
        See Details
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from "vue-router";
import type { PropType } from "vue";

export interface BookObj {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  tags: string[];
  initialQty: number;
  qty: number;
  coverImage?: string;
}

export default {
  name: "BookCard",
  components: {
    RouterLink,
  },
  props: {
    book: {
      type: Object as PropType<BookObj>,
      required: true,
    },
  },
  methods: {
    getReadMoreLink(id: string) {
      return `/detail/${id}`;
    },
  },
};
</script>
