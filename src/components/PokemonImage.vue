<template>
  <img 
    :src="pokemon?.sprites.other.dream_world.front_default" 
    :alt="`Imagen de ${pokemon?.name}`" 
    class="object-contain mx-auto"
    :class="{
      'cursor-pointer': !route.params.id
    }"
    @click="emit('goToPokemonPage', pokemon?.id)"
  />
</template>

<script setup lang="ts">
import type { Pokemon } from '@/interfaces/pokemon';
import { useRoute } from 'vue-router';
const route = useRoute();
const emit = defineEmits<{
  (e: 'goToPokemonPage', id: number): void
}>();
defineProps<{
  pokemon: Pokemon
}>()
</script>