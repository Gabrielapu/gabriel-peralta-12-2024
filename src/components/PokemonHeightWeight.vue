<template>
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
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
const store = usePokemonStore()

function getHeight (): number {
  return store.detailedPokemonData ? (store.detailedPokemonData.height / 10) : 0;
}

function getWeight (): number {
  return store.detailedPokemonData ? (store.detailedPokemonData.weight / 10) : 0;
}
</script>