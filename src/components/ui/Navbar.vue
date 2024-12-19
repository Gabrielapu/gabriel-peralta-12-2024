<template>
  <nav class="bg-white border-b-2 border-gray-200 fixed top-0 w-full z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <img src="../../assets/logo.png" class="h-8" alt="">
        </div>
        <div class="hidden md:flex space-x-8">
          <RouterLink 
            to="/" 
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
          >
            Home
          </RouterLink>
          <RouterLink 
            to="/team" 
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
          >
            Team
          </RouterLink>
        </div>
        <div class="flex md:hidden">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500
            hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            <img src="../../assets/menu.svg" alt="menu" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="isMenuOpen" >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink 
          to="/" 
          class="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/team" 
          class="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
        >
          Team
        </RouterLink>
      </div>
    </div>
    
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref<boolean>(false);

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>