import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { Pokemon } from '@/interfaces/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon[]>([])
  const selectedPokemons = ref<Pokemon['id'][]>([])

  async function getPokemonList() {
    const response = await api.get('/pokemon?offset=151&limit=151')
    pokemonList.value = response.data.results.map((pokemon : Pokemon) => {
      const id = pokemon.url.split('/').slice(-2, -1)[0]; // Permite extraer el ID de la URL
      return { name: pokemon.name, id: id };
    });
  }

  function addPokemonToTeam(pokemonId: number) {
    selectedPokemons.value.push(pokemonId)
  }

  function removePokemonFromTeam(pokemonId: number) {
    selectedPokemons.value = selectedPokemons.value.filter((id: number) => id !== pokemonId)
  }

  return { pokemonList, getPokemonList, selectedPokemons, addPokemonToTeam, removePokemonFromTeam }
})
