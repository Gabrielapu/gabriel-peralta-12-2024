<template>
  <div
    v-if="visible"
    class="fixed top-2 right-2 bg-blue-500 text-white px-4 py-3 rounded-md shadow-lg transition-transform transform scale-100 z-50 flex items-center"
  >
    <img src="../assets/x.svg" class="w-6 h-6 text-white mr-1" alt="" @click="visible = false">
    <div>
      {{ selected ? 'Agregaste' : 'Eliminaste' }} a <strong>{{ pokemonName }}</strong> {{ selected ? 'a' : 'de' }} tu equipo! 
      <span>{{ `(${store.lengthSelectedPokemons}/6)` }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePokemonStore } from '@/stores/pokemon';
import { ref, watch } from 'vue';

const visible = ref<boolean>(false);
const store = usePokemonStore();

const emit = defineEmits(['clearProps']);
const props = defineProps<{
  pokemonName: string;
  selected: boolean;
}>();

const showNotification = () => {
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