<template>
  <div 
    class="border border-gray-300 rounded-lg shadow-md p-4 w-[500px] 
      transition-transform transform hover:translate-y-1 hover:shadow-lg"
  >
    <img 
      :src="pokemon.sprites.other.dream_world.front_default" 
      :alt="`Imagen de ${pokemon.name}`" 
      class="h-40 w-50 object-contain mx-auto cursor-pointer"
      @click="goToPokemonPage(pokemon.id)"
    />
    <h2 class="text-xl font-bold text-center mt-4">{{ pokemon.name }}</h2>

    <div class="flex justify-center space-x-2 mt-2">
      <span class="text-gray-500 font-semibold">Tipo: </span>
      <span 
        v-for="types, idx in pokemon.types" 
        :key="idx" 
        class="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-semibold" 
        :class="typeColors[types.type.name]"
      >
        {{ types.type.name.toUpperCase() }}
      </span>
    </div>
    <hr class="my-3 border-gray-300">
    <div>
      <Bar
        id="my-chart-id"
        :options="{ responsive: true }"
        :data="{
          labels: chartLabels,
          datasets: chartDataSets
        }"
      />
    </div>
    <button 
      @click="deleteFromTeam()" 
      class="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded fixed top-0 right-3">
      Eliminar
    </button>
    <button 
      @click="playCry" 
      class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
      Escuchar sonido
    </button>
  </div>
</template>

<script setup lang="ts">
import type { DetailedPokemon } from '@/interfaces/detailedPokemon';
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { usePokemonStore } from '@/stores/pokemon';
import { useRouter } from 'vue-router';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = usePokemonStore()
const router = useRouter()
const props = defineProps<{ pokemon: DetailedPokemon }>();
const chartLabels = computed(() => {
  return props.pokemon.stats.map(stat => stat.stat.name);
})
const chartDataSets = computed(() => {
  return [
    {
      label: 'Stats',
      data: props.pokemon.stats.map(stat => stat.base_stat),
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)', 
        'rgba(255, 206, 86, 1)',
        'rgba(95, 192, 192, 1)',
        'rgba(215, 206, 86, 1)',
        'rgba(155, 192, 192, 1)'
      ],
    }
  ]
})
const audio = ref<HTMLAudioElement | null>(null);

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-gray-600',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const playCry = () => {
  if (audio.value) {
    audio.value.pause();
    audio.value.currentTime = 0;
  }
  audio.value = new Audio(props.pokemon.cries.latest);
  audio.value.play();
};

const deleteFromTeam = () => {
  store.deleteFromTeam(props.pokemon.id)
}

const goToPokemonPage = (pokemonId: number | string) => {
  router.push(`/team/${pokemonId}`)
}

</script>
