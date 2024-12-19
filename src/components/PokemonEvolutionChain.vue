<template>
  <div class="w-full p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Cadena Evolutiva</h2>
    <div class="flex justify-center items-center flex-col lg:flex-row">
      <div
        v-for="(pokemon, index) in evolutionChain"
        :key="pokemon.name"
        class="flex items-center flex-col lg:flex-row mb-4 lg:mb-2"
      >
        <div class="flex flex-col items-center">
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
          class="m-4 text-gray-400 text-3xl"
        >
          <div class="rotate-90 lg:rotate-0">➡️</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
import { ref, onMounted } from "vue";
import { useSplitUrl } from "@/composables/useSplitUrl";

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
  const id = useSplitUrl(chain.species.url, '/');
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
