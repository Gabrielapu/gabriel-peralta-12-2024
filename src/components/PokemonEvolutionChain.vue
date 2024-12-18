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
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
            :alt="pokemon.name"
            class="w-36 h-36 object-contain"
          />
          <p class="text-lg font-semibold text-gray-700 capitalize">{{ pokemon.name }}</p>
        </div>
        <div v-if="index < evolutionChain.length - 1" class="mx-4 text-gray-400 text-3xl">
          ➡️
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
import { ref, onMounted } from "vue";

const store = usePokemonStore();
const evolutionChain = ref([]);

onMounted(() => {
  evolutionChain.value = parseChain(store.evolutionChain.chain);
});

const parseChain = (chain) => {
  const chainArray = [];
  let current = chain;

  while (current) {
    const id = current.species.url.split("/").slice(-2, -1)[0];
    chainArray.push({
      id: parseInt(id),
      name: current.species.name,
    });
    current = current.evolves_to[0]; // Tomar solo la primera evolución
  }
  return chainArray;
};
</script>