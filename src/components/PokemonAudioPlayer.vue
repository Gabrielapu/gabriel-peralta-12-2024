<template>
  <div class="flex items-center my-4">
    <span class="text-gray-500 font-semibold mr-2">Sonido: </span>
    <audio class="h-8 w-full" controls ref="audioRef" :src="audioSrc"></audio>
  </div>
</template>

<script setup>
defineProps({
  audioSrc: {
    type: String,
    required: true,
  },
})
</script>
