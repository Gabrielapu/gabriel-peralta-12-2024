<template>
  <div 
    class="border border-gray-300 rounded-lg shadow-md p-4 w-full 
      transition-transform transform hover:translate-y-1 hover:shadow-lg"
  >
    <PokemonImage 
      class="h-40 w-40 mt-3" 
      :pokemon="pokemon" 
      @goToPokemonPage="goToPokemonPage" 
    />
    <h2 class="text-xl font-bold text-center mt-4">
      {{ pokemon.name }}
    </h2>
    <PokemonTypes :pokemonTypes="pokemon.types" />    
    <PokemonAudioPlayer :audioSrc="pokemon.cries.latest" />
    <hr class="my-3 border-gray-300">
    <PokemonStatsChart :pokemonStats="pokemon.stats" />
    <button 
      @click="deleteFromTeam()" 
      class="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold 
        py-2 px-4 rounded fixed top-0 right-3"
    >
      Eliminar
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import { useRouter } from 'vue-router';
import PokemonAudioPlayer from './PokemonAudioPlayer.vue';
import PokemonStatsChart from './PokemonStatsChart.vue';
import PokemonTypes from './PokemonTypes.vue';
import PokemonImage from './PokemonImage.vue';
import type { Pokemon } from '@/interfaces/pokemon';

const store = usePokemonStore()
const router = useRouter()
const props = defineProps<{ 
  pokemon: Pokemon 
}>();

function deleteFromTeam(): void {
  store.deleteFromTeam(props.pokemon.id)
}

function goToPokemonPage(pokemonId: number): void {
  router.push(`/team/${pokemonId}`)
}

</script>
