<template>
  <Spinner class="mt-20" v-if="isLoading" />
  <div v-if="isWrongId" class="flex flex-col items-center justify-center h-[50vh]">
    <p class="text-xl text-gray-700 mb-6">Este pokemon no pertenece a tu equipo, seleccionalo en el inicio!</p>
    <router-link to="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Volver al inicio
    </router-link>
  </div>
  <div 
    v-if="!isLoading && !isWrongId"
    class="px-10 py-5"
  >
    <h1 class="text-6xl font-semibold text-gray-600 text-center mb-5">{{ store.detailedPokemonData.name }}</h1>
    <div class="my-4">
      <h2 class="text-lg font-semibold text-gray-700">Descripción</h2>
      <p class="mt-2 text-sm text-gray-600">
        {{ store.detailedPokemonData.flavor_text_entries.flavor_text }}
      </p>
    </div>
    <div class="flex items-center w-full h-96">
      <div class="p-4 w-2/5">
        <PokemonImage class="h-72 w-full" :pokemon="store.detailedPokemonData" />
        <PokemonTypes :pokemonTypes="store.detailedPokemonData?.types" />
        <PokemonAudioPlayer :audioSrc="store.detailedPokemonData?.cries?.latest" />
      </div>
      <PokemonStatsChart class="w-3/5" :pokemonStats="store.detailedPokemonData?.stats" />
    </div>  
    <hr class="my-3 border-gray-300">
    <div class="mt-4 grid grid-cols-2 gap-4 text-center">
      <div class="p-2 bg-blue-50 rounded-lg">
        <h3 class="text-sm font-medium text-gray-700">Altura</h3>
        <p class="text-lg font-bold text-gray-800">{{ `${getHeight()} m` }}</p>
      </div>
      <div class="p-2 bg-blue-50 rounded-lg">
        <h3 class="text-sm font-medium text-gray-700">Peso</h3>
        <p class="text-lg font-bold text-gray-800">{{ `${getWeight()} kg` }}</p>
      </div>
    </div>
    <PokemonEvolutionChain class="mt-4" />
  </div>    
</template>

<script setup lang="ts">
import type { DetailedPokemon } from '@/interfaces/detailedPokemon';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import PokemonAudioPlayer from '../components/PokemonAudioPlayer.vue';
import PokemonStatsChart from '../components/PokemonStatsChart.vue';
import PokemonTypes from '../components/PokemonTypes.vue';
import PokemonImage from '../components/PokemonImage.vue';
import Spinner from '@/components/ui/Spinner.vue';
import PokemonEvolutionChain from '@/components/PokemonEvolutionChain.vue';

const store = usePokemonStore()
const route = useRoute()
const isLoading = ref<boolean>(true);
const isWrongId = ref<boolean>(false);

onMounted(async () => {
  const pokemonId = route.params.id
  if(!store.selectedPokemons.includes(pokemonId)) {
    isWrongId.value = true
    isLoading.value = false
    return
  }
  await store.getPokemonData(pokemonId)
  isLoading.value = false
})

const getHeight = () => {
  return (store.detailedPokemonData.height /10)
}

const getWeight = () => {
  return (store.detailedPokemonData.weight /10)
}
</script>