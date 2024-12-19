<template>
  <Spinner v-if="isLoading" />
  <div 
    v-if="store.lengthSelectedPokemons" 
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 p-4"
  >
    <PokemonDetailedCard 
      v-for="pokemon, idx in store.pokemonTeamData" 
      :key="idx" 
      :pokemon="pokemon"
    />
  </div>
  <div v-else class="flex flex-col items-center justify-center px-6 mt-20">
    <h2 class="text-2xl font-bold text-gray-700 text-center mb-4">
      ¡No tienes pokemones en tu equipo!
    </h2>
    <p class="text-gray-500 text-center mb-6">
      Selecciona algunos desde la página de inicio para comenzar tu aventura.
    </p>
    <RouterLink 
      to="/" 
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Ir a la página de inicio
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import PokemonDetailedCard from '@/components/PokemonDetailedCard.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { onMounted, ref } from 'vue';

const store = usePokemonStore()
const isLoading = ref<boolean>(true)

onMounted(async () => {
  await store.getPokemonTeamData();
  isLoading.value = false
})
</script>