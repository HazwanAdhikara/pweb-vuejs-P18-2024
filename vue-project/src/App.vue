<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/navbar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="container mx-auto mt-8 px-4">
      <RouterView />
    </main>
  </div>
</template>