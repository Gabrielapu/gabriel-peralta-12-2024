<template>
  <Spinner class="mt-20" v-if="isLoading" />
  <PokemonNotInTeam v-if="isWrongId" />
  <div 
    v-if="!isLoading && !isWrongId"
    class="px-5 py-2 lg:px-10 lg:py-5"
  >
    <h1 class="text-6xl font-semibold text-gray-600 text-center mb-5">
      {{ store.detailedPokemonData?.name }}
    </h1>
    <div class="mt-2 mb-8">
      <h2 class="text-lg font-semibold text-gray-700">Descripción</h2>
      <p class="mt-2 text-sm text-gray-600">
        {{ store.detailedPokemonData?.flavor_text_entries.flavor_text }}
      </p>
    </div>
    <div class="items-center w-full lg:h-96 lg:flex">
      <div class="p-4 lg:w-2/5">
        <PokemonImage class="lg:h-72 w-full" :pokemon="store.detailedPokemonData" />
        <PokemonTypes :pokemonTypes="store.detailedPokemonData?.types" />
        <PokemonAudioPlayer :audioSrc="store.detailedPokemonData?.cries?.latest" />
      </div>
      <div class="lg:w-3/5">
        <PokemonStatsChart :pokemonStats="store.detailedPokemonData?.stats" />
      </div>
    </div>  
    <hr class="my-6 border-gray-300">
    <PokemonHeightWeight />
    <PokemonEvolutionChain class="mt-4" />
  </div>    
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import PokemonAudioPlayer from '../components/PokemonAudioPlayer.vue';
import PokemonStatsChart from '../components/PokemonStatsChart.vue';
import PokemonTypes from '../components/PokemonTypes.vue';
import PokemonImage from '../components/PokemonImage.vue';
import Spinner from '@/components/ui/Spinner.vue';
import PokemonEvolutionChain from '@/components/PokemonEvolutionChain.vue';
import PokemonHeightWeight from '@/components/PokemonHeightWeight.vue';
import PokemonNotInTeam from '@/components/PokemonNotInTeam.vue';

const store = usePokemonStore()
const route = useRoute()
const isLoading = ref<boolean>(true);
const isWrongId = ref<boolean>(false);

onMounted(async () => {
  const pokemonId = Array.isArray(route.params.id) 
    ? parseInt(route.params.id[0]) 
    : parseInt(route.params.id);
  
  if(!store.selectedPokemons.includes(pokemonId)) {
    isWrongId.value = true
    isLoading.value = false
    return
  }
  await store.getPokemonData(pokemonId)
  isLoading.value = false
})
</script>