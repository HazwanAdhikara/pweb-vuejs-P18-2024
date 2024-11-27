<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-center">Create Book</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <!--Title-->
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          v-model="book.title"
          placeholder="Enter book title"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Author -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          v-model="book.author"
          placeholder="Enter author name"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Published Date -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Published Date</label
        >
        <input
          type="date"
          v-model="book.publishedDate"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Publisher -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Publisher</label>
        <input
          type="text"
          v-model="book.publisher"
          placeholder="Enter publisher name"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          v-model="book.description"
          placeholder="Enter book description"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Cover Image -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Cover Image URL</label
        >
        <input
          type="url"
          v-model="book.coverImage"
          placeholder="Enter cover image URL"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          v-model="book.tags"
          placeholder="Enter tags (comma-separated)"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Initial Quantity -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Initial Quantity</label
        >
        <input
          type="number"
          v-model="book.initialQty"
          placeholder="Enter initial quantity"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Quantity -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          v-model="book.qty"
          placeholder="Enter available quantity"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Rating -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Average Rating</label
        >
        <input
          type="number"
          step="0.1"
          v-model="book.rating.average"
          placeholder="Enter average rating"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Rating Count</label
        >
        <input
          type="number"
          v-model="book.rating.count"
          placeholder="Enter rating count"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      book: {
        title: "",
        author: "",
        publishedDate: "",
        publisher: "",
        description: "",
        coverImage: "",
        tags: "",
        initialQty: 0,
        qty: 0,
        rating: {
          average: 0,
          count: 0,
        },
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        // Split tags by comma and trim whitespace
        this.book.tags = this.book.tags.split(",").map((tag) => tag.trim());

        // Send POST request to the API
        const response = await axios.post(
          "http://localhost:4000/book",
          this.book
        );
        alert("Book created successfully!");
        console.log(response.data);

        // Reset form after submission
        this.resetForm();

        this.$router.push("/");
      } catch (error) {
        console.error("Error creating book:", error);
        alert("Failed to create book.");
      }
    },
    resetForm() {
      // Reset form data
      this.book = {
        title: "",
        author: "",
        publishedDate: "",
        publisher: "",
        description: "",
        coverImage: "",
        tags: "",
        initialQty: 0,
        qty: 0,
        rating: {
          average: 0,
          count: 0,
        },
      };
    },
  },
};
</script>
