<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    <PokemonSimpleCard 
      v-for="pokemon, idx in store.pokemonList" 
      :key="idx" 
      :pokemon="pokemon"
      @onSelect="e => onSelect(e)"
    />
  </div>
  <Spinner v-if="isLoading" />
  <ModifyTeamNotification 
    :pokemon-name="pokemonName" 
    :selected="pokemonSelected" 
    @clearProps="clearProps()"  
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import PokemonSimpleCard from '../components/PokemonSimpleCard.vue'
import ModifyTeamNotification from '@/components/ModifyTeamNotification.vue';
import Spinner from '@/components/ui/Spinner.vue';
import type { Pokemon } from '@/interfaces/pokemon';

const store = usePokemonStore()
const pokemonName = ref<string>('')
const pokemonSelected = ref<boolean>(false)
const isLoading = ref<boolean>(false);
const offset = ref<number>(0);
const limit = 25;
const pxToLoadNewPokemons = 200

interface selectedPokemon {
  pokemon: Pokemon;
  selected: boolean;
}

onMounted(() => {
  store.resetPokemonList();
  loadPokemon();
  window.addEventListener('scroll', onScroll);
})

function onSelect (event: selectedPokemon): void {
  pokemonName.value = event.pokemon.name
  pokemonSelected.value = event.selected
}

function clearProps (): void {
  pokemonName.value = ''
  pokemonSelected.value = false
}

async function loadPokemon(): Promise<void> {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    await store.getPokemonList(offset.value, limit);
    offset.value += limit;
  } finally {
    isLoading.value = false; 
  }
};

function onScroll(): void {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - pxToLoadNewPokemons) {
    loadPokemon();
  }
};

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>
