import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { Pokemon } from '@/interfaces/pokemon'
import type { PokemonChain } from '@/interfaces/pokemonChain'
import { useSplitUrl } from '@/composables/useSplitUrl'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon[]>([])
  const selectedPokemons = ref<Pokemon['id'][]>(
    JSON.parse(localStorage.getItem('pokemonTeam') || '[]')
  )
  const pokemonTeamData = ref<Pokemon[]>([])
  const detailedPokemonData = ref<Pokemon>({} as Pokemon)
  const evolutionChain = ref<PokemonChain>({} as PokemonChain)

  const lengthSelectedPokemons = computed(() => selectedPokemons.value.length)

  async function getPokemonData(id: number): Promise<void> {
    const pokemon = await api.get(`/pokemon/${id}`)
    const species = await api.get(`/pokemon-species/${id}`)
    const respEvolutionChain = await api.get(`${species.data.evolution_chain.url.split('v2')[1]}`)
    evolutionChain.value = respEvolutionChain.data
    detailedPokemonData.value = {
      ...pokemon.data, 
      flavor_text_entries: species.data.flavor_text_entries[0] 
    }
  }

  async function getPokemonList(offset: number, limit: number): Promise<void> {
    const response = await api.get('/pokemon', {
      params: { offset, limit },
    })
    const mappedData = response.data.results.map((pokemon : Pokemon) => {
      const id = useSplitUrl(pokemon.url || '', '/');
      return { name: pokemon.name, id: parseInt(id) };
    });
    pokemonList.value = [...pokemonList.value, ...mappedData];
  }

  async function getPokemonTeamData(): Promise<void> {
    const pokemonRequests = selectedPokemons.value.map((id: number) =>
      api.get(`/pokemon/${id}`)
    );
    const responses = await Promise.all(pokemonRequests);
    pokemonTeamData.value = responses.map((response) => response.data);
  }

  function resetPokemonList(): void {
    pokemonList.value = []
  }

  function deleteFromTeam(id: number): void {
    selectedPokemons.value = selectedPokemons.value.filter((pokemonId: number) => pokemonId !== id)
    pokemonTeamData.value = pokemonTeamData.value.filter((pokemon: Pokemon) => pokemon.id !== id)
  }

  function addPokemonToTeam(pokemonId: number):void {
    selectedPokemons.value.push(pokemonId)
    setLocalStorage()
  }

  function removePokemonFromTeam(pokemonId: number): void {
    selectedPokemons.value = selectedPokemons.value.filter((id: any) => id !== pokemonId)
    setLocalStorage()
  }

  function setLocalStorage(): void {
    localStorage.setItem('pokemonTeam', JSON.stringify(selectedPokemons.value))
  }

  return { 
    pokemonList, 
    lengthSelectedPokemons, 
    selectedPokemons, 
    pokemonTeamData,
    detailedPokemonData,
    evolutionChain,
    getPokemonList, 
    addPokemonToTeam, 
    removePokemonFromTeam,
    getPokemonTeamData,
    resetPokemonList,
    deleteFromTeam,
    getPokemonData
  }
})
