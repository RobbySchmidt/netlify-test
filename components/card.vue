<template>
  <div class="shadow-md rounded-lg overflow-hidden text-center cursor-pointer hover:scale-105 duration-200 ease-in-out">
    <img :src="image" alt="">
    <span class="py-2 block text-gray-500">{{ description }}</span>
  </div>
</template>

<script setup>
  defineProps({
    image: String,
    description: String
  })
</script>

<style scoped>

</style>