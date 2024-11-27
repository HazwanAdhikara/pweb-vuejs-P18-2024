<template>
  <div class="flex lg:ml-24 gap-x-10 flex-col lg:flex-row mt-8">
    <div class="w-full md:w-4/6 lg:w-[500px] lg:flex-shrink-0">
      <img
        v-if="bookDetails.coverImage"
        :src="bookDetails.coverImage"
        class="rounded-xl w-full"
        alt="Book Cover"
      />
    </div>
    <div class="mt-10 lg:mt-0 lg:pr-24 w-full">
      <h1 class="font-bold text-xl md:text-2xl lg:text-3xl text-left">
        Edit Book: {{ bookTitle }}
      </h1>
      <hr class="border border-black my-2" />

      <div class="mb-4">
        <label for="title" class="font-bold">Title:</label>
        <input
          id="title"
          type="text"
          v-model="bookDetails.title"
          class="w-full border p-2 rounded mt-2"
          :placeholder="bookDetails.title"
        />
      </div>

      <div class="mb-4">
        <label for="author" class="font-bold">Author:</label>
        <input
          id="author"
          type="text"
          v-model="bookDetails.author"
          class="w-full border p-2 rounded mt-2"
          :placeholder="bookDetails.author"
        />
      </div>

      <div class="mb-4">
        <label for="rating" class="font-bold">Rating:</label>
        <input
          id="rating"
          type="number"
          v-model="bookDetails.rating.average"
          min="0"
          max="5"
          step="0.1"
          class="w-full border p-2 rounded mt-2"
          :placeholder="bookDetails.rating.average.toString()"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="font-bold">Description:</label>
        <textarea
          id="description"
          v-model="bookDetails.description"
          class="w-full border p-2 rounded mt-2"
          :placeholder="bookDetails.description"
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="publishedDate" class="font-bold">Published Date:</label>
        <input
          id="publishedDate"
          type="date"
          v-model="bookDetails.publishedDate"
          class="w-full border p-2 rounded mt-2"
          :placeholder="bookDetails.publishedDate"
        />
      </div>

      <div class="mb-4">
        <label for="publisher" class="font-bold">Publisher:</label>
        <input
          id="publisher"
          type="text"
          v-model="bookDetails.publisher"
          class="w-full border p-2 rounded mt-2"
          :placeholder="bookDetails.publisher"
        />
      </div>

      <!-- <div class="mb-4">
        <label for="tags" class="font-bold">Category:</label>
        <input
          id="tags"
          type="text"
          v-model="bookDetails.tags"
          class="w-full border p-2 rounded mt-2"
          :placeholder="tagsPlaceholder"
        />
      </div> -->

      <div class="mb-4">
        <label for="qty" class="font-bold">Stock:</label>
        <input
          id="qty"
          type="number"
          v-model="bookDetails.qty"
          min="0"
          class="w-full border p-2 rounded mt-2"
          :placeholder="bookDetails.qty"
        />
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
    bookDetails: {
      rating: {
        average: 0,
        count: 0,
      },
      // Initialize other properties with default values if needed
    } as BookDetails,
    fetchError: false,
    isToggled: false,
  }),
  async mounted() {
    console.log("tes");
    try {
      const response = await fetch(
        `http://localhost:4000/book/${this.$route.params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      this.bookTitle = data.data.title;
      this.bookDetails = { ...data.data };
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    }
  },
  computed: {
    starRating(): string {
      if (
        !this.bookDetails.rating ||
        typeof this.bookDetails.rating.average !== "number"
      ) {
        return ""; // Fallback if rating data is missing
      }
      const stars = Math.floor(this.bookDetails.rating.average);
      return "⭐".repeat(stars);
    },
    tagsPlaceholder(): string {
      return this.bookDetails.tags.join(", ");
    },
  },
});
</script>
