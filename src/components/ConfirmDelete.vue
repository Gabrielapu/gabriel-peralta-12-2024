<template>
  <div>
    <button
      @click="openModal"
      class="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold 
        py-1 px-2 lg:py-2 lg:px-4 rounded fixed top-0 right-3"
    >
      Eliminar
    </button>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
    >
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
        <h2 class="text-xl font-bold text-gray-800 mb-4">
          Confirmar eliminación
        </h2>
        <p class="text-sm text-gray-600 mb-6">
          ¿Estás seguro de que deseas eliminar <strong>{{ itemName }}</strong>?<br />
          Esta acción no se puede deshacer.
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            @click="confirmDeletion"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
defineProps({
  itemName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();

const isModalOpen = ref<boolean>(false);

const openModal = ():boolean => (isModalOpen.value = true);
const closeModal = ():boolean => (isModalOpen.value = false);
const confirmDeletion = ():void => {
  emit('confirm');
  closeModal();
};
</script>
