<template>
  <div
    v-if="visible"
    class="fixed bottom-3 right-3 lg:bottom-8 lg:right-8 bg-blue-500 text-white px-4 
      py-3 rounded-md shadow-lg transition-transform transform scale-100 z-50 flex items-center"
  >
    <span 
      @click="visible = false" 
      class="text-white mr-2 text-xl cursor-pointer"
    >
      &times;
    </span>
    <div>
      {{ selected ? 'Agregaste' : 'Eliminaste' }} a 
      <strong>{{ pokemonName }}</strong> 
      {{ selected ? 'a' : 'de' }} tu equipo! 
      <span>{{ `(${store.lengthSelectedPokemons}/6)` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import { ref, watch } from 'vue';

const visible = ref<boolean>(false);
const store = usePokemonStore();

const emit = defineEmits<{
  (e: 'clearProps'): void
}>();

const props = defineProps<{
  pokemonName: string;
  selected: boolean;
}>();

function showNotification(): void {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
    emit('clearProps');
  }, 4000);
};

watch(() => props.pokemonName, () => {
  if (props.pokemonName) {
    showNotification();
  }
}, { deep: true });
</script>