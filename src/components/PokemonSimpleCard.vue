<template>
  <div 
    @click="selectPokemon" 
    :class="{
      'ring-2 ring-blue-400': selected,
      'hover:ring-2 hover:ring-blue-300 hover:shadow-lg duration-300': !selected && store.lengthSelectedPokemons < 6
    }" 
    class="max-w-sm w-full p-0 border border-transparent rounded-lg shadow-md"
  >
    <div class="bg-white rounded-lg overflow-hidden ">
      <img 
        :src="
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
        " 
        :alt="pokemon?.name" 
        class="w-full h-48 object-fill"
      >
      <div class="p-4">
        <h2 class="text-lg font-semibold text-gray-800 text-center">
          {{ pokemon?.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import type { Pokemon } from '@/interfaces/pokemon';

const props = defineProps<{
  pokemon: Pokemon,
}>()
const emit = defineEmits<{
  (e: 'onSelect', payload: { pokemon: Pokemon, selected: boolean }): void
}>()
const store = usePokemonStore()
const selected = ref<boolean>(false)

onMounted(() => {
  selected.value = store.selectedPokemons.includes(props.pokemon.id)
})

function selectPokemon(): void {
  if (store.lengthSelectedPokemons < 6 && !selected.value) {
    store.addPokemonToTeam(props.pokemon.id)
    selected.value = true
    emit('onSelect', { pokemon: props.pokemon, selected: selected.value })
    return;
  }

  if(selected.value) {
    store.removePokemonFromTeam(props.pokemon.id)
    selected.value = false
    emit('onSelect', { pokemon: props.pokemon, selected: selected.value })
  }
}
</script>