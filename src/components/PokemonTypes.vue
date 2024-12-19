<template>
  <div class="flex justify-center space-x-2 mt-2">
    <span class="text-gray-500 font-semibold">Tipo: </span>
    <span 
      v-for="types, idx in pokemonTypes" 
      :key="idx" 
      class="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-semibold" 
      :class="typeColors[types.type.name]"
    >
      {{ types.type.name.toUpperCase() }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '@/interfaces/pokemon';

defineProps<{ 
  pokemonTypes: Pokemon['types'] | undefined
}>();

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-gray-600',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

</script>