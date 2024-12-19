<template>
  <Bar
    id="my-chart-id"
    :options="{ 
      responsive: true,      
    }"
    :data="{
      labels: chartLabels,
      datasets: chartDataSets
    }"
  />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale 
} from 'chart.js'
import { computed } from 'vue';
import type { Pokemon } from '@/interfaces/pokemon';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{ 
  pokemonStats: Pokemon['stats'] | undefined
}>();
const chartLabels = computed(() => {
  return props.pokemonStats?.map((stat: Pokemon['stats'][number]) => stat.stat.name);
})
const chartDataSets = computed(() => {
  return [
    {
      label: 'Stats',
      data: props.pokemonStats?.map((stat: Pokemon['stats'][number]) => stat.base_stat) || [],
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
</script>