import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { Pokemon } from '@/interfaces/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon[]>([])
  const selectedPokemons = ref<Pokemon['id'][]>([])

  const lengthSelectedPokemons = computed(() => selectedPokemons.value.length)

  async function getPokemonList(offset: number, limit: number) {
    const response = await api.get('/pokemon', {
      params: { offset, limit },
    })

    const mappedData = response.data.results.map((pokemon : Pokemon) => {
      const id = pokemon.url?.split('/').slice(-2, -1)[0]; // Obtener el id en base a la url
      return { name: pokemon.name, id: id };
    });

    pokemonList.value = [...pokemonList.value, ...mappedData];
  }

  function addPokemonToTeam(pokemonId: number | string) {
    selectedPokemons.value.push(pokemonId)
  }

  function removePokemonFromTeam(pokemonId: number | string) {
    selectedPokemons.value = selectedPokemons.value.filter((id: any) => id !== pokemonId)
  }

  return { 
    pokemonList, 
    lengthSelectedPokemons, 
    selectedPokemons, 
    getPokemonList, 
    addPokemonToTeam, 
    removePokemonFromTeam
  }
})
