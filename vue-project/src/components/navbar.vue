<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-white font-bold text-xl">P18</RouterLink>
      <ul class="flex space-x-4">
        <li>
          <RouterLink
            to="/"
            class="text-gray-300 hover:text-white transition duration-300"
            active-class="text-white"
            >Home</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/add-book"
            class="text-gray-300 hover:text-white transition duration-300"
            active-class="text-white"
            >Add Book</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
});
</script>
