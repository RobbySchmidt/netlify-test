<template>
  <div class="container px-8 py-8 xl:py-12">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      <NuxtLink v-for="image in store.publishedImages" :to="`/gallery/${image.id}`">
        <card :image="image.image" :description="image.description"/>
      </NuxtLink>
    </div>
    <carousel :items="store.images"/>
  </div>
</template>

<script setup>
  import { useStore } from '/store/store.ts'

  const store = useStore()
</script>

<style scoped>

</style>