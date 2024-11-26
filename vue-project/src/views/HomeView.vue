<script lang="ts">
import Book from "@/components/Book.vue";


interface BookObj {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  tags: string[];
  initialQty: number;
  qty: number;
}

export default {
  name: "HomeView",
  data: () => ({
    booksData: [] as BookObj[],
    fetchError: false,
    isLoading: true,
  }),
  async mounted() {
    try {
      const response = await fetch("http://localhost:4000/book");
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      this.booksData = data.data;
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    } finally {
      this.isLoading = false;
    }
  },
  components: {
    Book,
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">Book List</h1>
        <div v-if="isLoading" class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <p class="mt-2 text-gray-600">Loading books...</p>
        </div>
        <div v-else-if="fetchError" class="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline"> Failed to fetch book data. Please try again later.</span>
        </div>
        <div v-else-if="booksData.length === 0" class="text-center text-gray-600">
          <p>No books found. Try adding some books to your collection.</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Book
            v-for="book in booksData"
            :key="book._id"
            :book="book"
          />
        </div>
      </div>
    </main>
  </div>
</template>