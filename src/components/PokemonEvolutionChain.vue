<template>
  <div class="w-full p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Cadena Evolutiva</h2>
    <div class="flex justify-center items-center">
      <div
        v-for="(pokemon, index) in evolutionChain"
        :key="pokemon.name"
        class="flex items-center"
      >
        <div class="flex flex-col items-center space-y-2">
          <img
            :src="
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
            "
            :alt="pokemon.name"
            class="w-36 h-36 object-contain"
          />
          <p class="text-lg font-semibold text-gray-700 capitalize">{{ pokemon.name }}</p>
        </div>
        <div 
          v-if="index < (evolutionChain?.length || 0) - 1" 
          class="mx-4 text-gray-400 text-3xl"
        >
          ➡️
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokemonChain } from "@/interfaces/pokemonChain";
import { usePokemonStore } from "@/stores/pokemon";
import { ref, onMounted } from "vue";

interface Chain {
  id: number;
  name: string;
}

interface RawChain {
  species: {
    name: string;
    url: string;
  };
  evolves_to: RawChain[];
}

const store = usePokemonStore();
const evolutionChain = ref<Chain[]>();

onMounted(() => {
  if (store.evolutionChain?.chain) {
    evolutionChain.value = parseChain(store.evolutionChain.chain);
  }
});

function parseChain(chain: RawChain): Chain[] {
  if (!chain) return [];
  const id = chain.species.url.split('/').slice(-2, -1)[0];
  const parsedChain: Chain[] = [
    {
      id: parseInt(id),
      name: chain.species.name,
    },
  ];
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    parsedChain.push(...parseChain(chain.evolves_to[0]));
  }
  return parsedChain;
}
</script>