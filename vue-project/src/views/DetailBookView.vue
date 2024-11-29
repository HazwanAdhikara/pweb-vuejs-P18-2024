<script lang="ts">
import { defineComponent } from "vue";
import Editbook from "@/components/editbook.vue";

interface Rating {
  average: number;
  count: number;
}

interface BookDetail {
  rating: Rating;
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  description: string;
  coverImage: string;
  tags: string[];
  initialQty: number;
  qty: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default defineComponent({
  name: "DetailBookView",
  components: {
    Editbook,
  },
  data: () => ({
    bookDetail: {} as BookDetail,
    fetchError: false,
    isToggled: false,
  }),
  async mounted() {
    try {
      const response = await fetch(
        `http://localhost:4000/book/${this.$route.params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      this.bookDetail = { ...data.data };
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    }
  },
  methods: {
    async deleteBook() {
      const response = await fetch(
        `http://localhost:4000/book/${this.$route.params.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Book has been removed!");
      this.$router.push("/");
    },
  },
  computed: {
    starRating(): string {
      const stars = Math.floor(this.bookDetail.rating.average);
      return "⭐".repeat(stars);
    },
  },
});
</script>
<template>
  <main class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <RouterLink
        to="/"
        class="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </RouterLink>

      <!-- Error State -->
      <div v-if="fetchError" class="text-center py-12">
        <svg
          class="mx-auto h-24 w-24 text-red-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 class="text-3xl font-bold text-gray-800">
          Failed to Load Book Data
        </h1>
        <p class="text-gray-600 mt-2">Please try again later</p>
      </div>

      <!-- Book Detail -->
      <div
        v-else-if="bookDetail.title"
        class="bg-white shadow-lg rounded-xl overflow-hidden"
      >
        <div class="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          <!-- Book Cover -->
          <div class="flex items-center justify-center">
            <img
              :src="bookDetail.coverImage"
              class="rounded-lg max-h-[500px] w-auto object-cover shadow-md"
              alt="Book Cover"
            />
          </div>

          <!-- Book Information -->
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900 mb-4">
              {{ bookDetail.title }}
            </h1>
            <h2 class="text-xl text-gray-600 mb-4">
              by {{ bookDetail.author }}
            </h2>

            <div class="flex items-center mb-4">
              <span class="text-yellow-500 mr-2">
                {{ starRating }} {{ bookDetail.rating.average }}/10
              </span>
              <span class="text-gray-500">
                ({{ bookDetail.rating.count }} reviews)
              </span>
            </div>

            <div class="space-y-4 text-gray-700">
              <div>
                <h3 class="font-semibold text-gray-900">About</h3>
                <p>{{ bookDetail.description }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <h4 class="font-semibold text-gray-900">Published</h4>
                  <p>{{ bookDetail.publishedDate }}</p>
                  <p>{{ bookDetail.publisher }}</p>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">Category</h4>
                  <p>{{ bookDetail.tags.join(", ") }}</p>
                </div>
              </div>

              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-900 mb-2">Stock</h4>
                <div class="flex items-center">
                  <div class="w-full bg-blue-200 rounded-full h-2.5 mr-2">
                    <div
                      class="bg-blue-600 h-2.5 rounded-full"
                      :style="`width: ${
                        (bookDetail.qty / bookDetail.initialQty) * 100
                      }%`"
                    ></div>
                  </div>
                  <span class="text-blue-800">
                    {{ bookDetail.qty }}/{{ bookDetail.initialQty }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 flex space-x-4">
              <button
                @click="deleteBook"
                class="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove Book
              </button>
              <button
                @click="$router.push(`/detail/${bookDetail._id}/edit`)"
                class="flex-1 bg-slate-500 text-white py-3 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Edit Book
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="text-center py-12">
        <div
          class="w-12 h-12 border-4 border-blue-500 border-t-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
        ></div>
        <h1 class="text-2xl font-semibold text-gray-700">
          Loading Book Details...
        </h1>
      </div>
    </div>
  </main>
</template>
