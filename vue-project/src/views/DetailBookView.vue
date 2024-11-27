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
  <main class="mt-14 mx-8 pb-14">
    <RouterLink
      to="/"
      class="px-4 text-white py-2 lg:ml-24 bg-blue-400 font-semibold rounded-xl inline-block"
      >⬅️ Back to Home</RouterLink
    >
    <div v-if="isToggled">
      <Editbook />
    </div>
    <div v-else>
      <div v-if="fetchError" class="mt-8">
        <h1 class="font-bold text-3xl text-center">Failed to load book data</h1>
      </div>
      <div v-else-if="bookDetail.title" class="mt-8">
        <div class="flex lg:ml-24 gap-x-10 flex-col lg:flex-row">
          <div class="w-full md:w-4/6 lg:w-[500px] lg:flex-shrink-0">
            <img
              :src="bookDetail.coverImage"
              class="rounded-xl w-full"
              alt="Book Cover"
            />
          </div>
          <div class="mt-10 lg:mt-0 lg:pr-24">
            <h1 class="font-bold text-xl md:text-2xl lg:text-3xl text-left">
              Buku {{ bookDetail.title }} by {{ bookDetail.author }}
            </h1>
            <h5 class="text-sm text-gray-500 font-bold mt-2">
              {{ bookDetail.rating.average }} {{ starRating }} ({{
                bookDetail.rating.count
              }})
            </h5>
            <hr class="border border-black my-2" />
            <h3 class="text-md md:text-lg break-all">
              <span class="font-bold">About:</span>
              {{ bookDetail.description }}
            </h3>
            <h3 class="text-md md:text-lg text-left">
              <span class="font-bold">Published:</span>
              {{ bookDetail.publishedDate }} by
              {{ bookDetail.publisher }}
            </h3>
            <h3 class="text-md md:text-lg text-left">
              <span class="font-bold">Category:</span>
              {{ bookDetail.tags.join(", ") }}
            </h3>
            <h3 class="text-md md:text-lg text-left">
              <span class="font-bold">Stock:</span>
              {{ bookDetail.qty }} of {{ bookDetail.initialQty }} books
            </h3>
          </div>
        </div>
        <div class="lg:ml-24 flex justify-center items-center">
          <button
            @click="deleteBook"
            class="px-4 mx-2 text-white py-2 w-1/4 bg-red-400 font-semibold rounded-xl mt-8 inline-block"
          >
            Remove Book
          </button>
          <button
            @click="isToggled = true"
            class="px-4 mx-2 text-white py-2 w-1/4 bg-slate-400 font-semibold rounded-xl mt-8 inline-block"
          >
            Edit Book
          </button>
        </div>
      </div>
      <div v-else class="mt-8">
        <h1 class="font-bold text-3xl text-center">Loading...</h1>
      </div>
    </div>
  </main>
</template>
