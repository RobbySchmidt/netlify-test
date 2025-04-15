<template>
  <div class="container max-w-4xl px-8 py-8 xl:py-12 space-y-4">
    <UButton 
      color="red"
      @click="$router.back()"
      class="inline-block cursor-pointer py-2 px-3 bg-green-500 text-white rounded-md duration-200 ease-in-out">
      Back to Gallery
    </UButton>
    <h2 class="text-2xl">{{ image.description }}</h2>
    <img :src="image.image" alt="">
  </div>
</template>

<script setup>
  import { useStore } from '/store/store.ts'
  const { params } = useRoute()

  const { getImageById } = useStore()

  const image = computed (() => getImageById(params.id))
</script>

<style scoped>

</style>