<script setup lang="ts">
import { onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import PokemonSimpleCard from '../components/PokemonSimpleCard.vue'

const store = usePokemonStore()

onMounted(() => {
  store.getPokemonList()
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    <PokemonSimpleCard 
      v-for="pokemon, idx in store.pokemonList" 
      :key="idx" 
      :pokemon="pokemon"
    />
  </div>
</template>
