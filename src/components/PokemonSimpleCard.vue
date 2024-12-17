<template>
  <div 
    @click="selectPokemon" 
    :class="{'ring-2 ring-blue-400': selected}" 
    class="max-w-sm w-full p-0 transition-transform transform 
      hover:ring-2 hover:ring-blue-300 border border-transparent 
      shadow-sm rounded-lg"
  >
    <div class="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition-shadow duration-300">
      <img 
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`" 
        :alt="pokemon?.name" 
        class="w-full h-48 object-fill"
      >
      <div class="p-4">
        <h2 class="text-lg font-semibold text-gray-800 text-center">{{ pokemon?.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import type { Pokemon } from '@/interfaces/pokemon';

const props = defineProps<{
  pokemon: Pokemon,
}>()
const store = usePokemonStore()
const selected = ref<boolean>(false)

const selectPokemon = () => {
  selected.value = !selected.value
  if(selected.value) {
    store.addPokemonToTeam(props.pokemon.id)
  } else {
    store.removePokemonFromTeam(props.pokemon.id)
  }
}
</script>