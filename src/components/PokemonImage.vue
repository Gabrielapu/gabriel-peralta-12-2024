<template>
  <img 
    :src="pokemon.sprites.other.dream_world.front_default" 
    :alt="`Imagen de ${pokemon.name}`" 
    class="object-contain mx-auto cursor-pointer"
    @click="emit('goToPokemonPage', pokemon.id)"
  />
</template>

<script setup lang="ts">
import type { DetailedPokemon } from '@/interfaces/detailedPokemon';
const emit = defineEmits(['goToPokemonPage']);
defineProps<{
  pokemon: DetailedPokemon
}>()
</script>