<template>
  <div class="container mx-auto p-4">
    <RouterLink
      :to="`/detail/${$route.params.id}`"
      class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mt-6"
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
      Back to Details
    </RouterLink>
    <div class="flex flex-col lg:flex-row lg:gap-x-10 mt-8">
      <!-- Cover Image Section -->
      <div class="w-full lg:w-1/2">
        <img
          v-if="bookDetails.coverImage"
          :src="bookDetails.coverImage"
          class="rounded-xl w-full"
          alt="Book Cover"
        />
      </div>
      <!-- Edit Form Section -->
      <div class="w-full lg:w-1/2 mt-10 lg:mt-0">
        <h1 class="font-bold text-xl md:text-2xl lg:text-3xl text-center">
          Edit Book: {{ bookTitle }}
        </h1>
        <hr class="border border-black my-4" />

        <!-- Form Fields -->
        <form @submit.prevent="confirmEdit" class="space-y-4">
          <div>
            <label for="title" class="font-bold block">Title:</label>
            <input
              id="title"
              type="text"
              v-model="bookDetails.title"
              class="w-full border p-2 rounded mt-2"
              :placeholder="bookDetails.title"
            />
          </div>

          <div>
            <label for="author" class="font-bold block">Author:</label>
            <input
              id="author"
              type="text"
              v-model="bookDetails.author"
              class="w-full border p-2 rounded mt-2"
              :placeholder="bookDetails.author"
            />
          </div>

          <div>
            <label for="rating" class="font-bold block">Rating:</label>
            <input
              id="rating"
              type="number"
              v-model="bookDetails.rating.average"
              min="0.1"
              max="10"
              step="0.1"
              class="w-full border p-2 rounded mt-2"
              :placeholder="bookDetails.rating.average.toString()"
            />
          </div>

          <div>
            <label for="tags" class="font-bold block">Tags:</label>
            <input
              id="tags"
              type="text"
              v-model="tagsString"
              class="w-full border p-2 rounded mt-2"
              :placeholder="tagsString || 'Enter tags, separated by commas'"
            />
          </div>

          <div>
            <label for="description" class="font-bold block">Description:</label>
            <textarea
              id="description"
              v-model="bookDetails.description"
              class="w-full border p-2 rounded mt-2"
              :placeholder="bookDetails.description"
            ></textarea>
          </div>

          <div>
            <label for="publishedDate" class="font-bold block">Published Date:</label>
            <input
              id="publishedDate"
              type="date"
              v-model="bookDetails.publishedDate"
              class="w-full border p-2 rounded mt-2"
              :placeholder="bookDetails.publishedDate"
            />
          </div>

          <div>
            <label for="publisher" class="font-bold block">Publisher:</label>
            <input
              id="publisher"
              type="text"
              v-model="bookDetails.publisher"
              class="w-full border p-2 rounded mt-2"
              :placeholder="bookDetails.publisher"
            />
          </div>

          <div>
            <label for="qty" class="font-bold block">Stock:</label>
            <input
              id="qty"
              type="number"
              v-model="bookDetails.qty"
              :max="bookDetails.initialQty"
              min="0"
              class="w-full border p-2 rounded mt-2"
              :placeholder="bookDetails.qty.toString()"
            />
          </div>

          <div>
            <button
              type="submit"
              class="flex bg-green-500 text-white text-lg md:text-xl py-2 px-8 rounded-lg hover:bg-green-600 transition-colors mx-auto"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface Rating {
  average: number;
  count: number;
}

export interface BookDetails {
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
  name: "Editbook",
  data: () => ({
    bookTitle: "",
    tagsString: "",
    bookDetails: {
      rating: {
        average: 0,
        count: 0,
      },
      initialQty: 0,
      qty: 0,
      tags: [],
    } as unknown as BookDetails,
    fetchError: false,
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
      this.bookTitle = data.data.title;

      this.bookDetails = {
        ...data.data,
        tags: data.data.tags || [],
        initialQty: data.data.initialQty,
      };

      this.tagsString = this.bookDetails.tags.join(", ");
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    }
  },
  methods: {
    async confirmEdit() {
      try {
        this.bookDetails.tags = this.tagsString
          .split(",")
          .map((tag: string) => tag.trim());

        const response = await fetch(
          `http://localhost:4000/book/${this.$route.params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.bookDetails),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update book data");
        }

        const data = await response.json();
        console.log("Book updated:", data);
        alert("Book has been successfully edited!");
        this.$router.push(`/detail/${this.$route.params.id}`);
      } catch (error) {
        console.error("Error updating book:", error);
        alert("Failed to update the book. Please try again.");
      }
    },
  },
});
</script>
