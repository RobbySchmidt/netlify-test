<template>
  <div class="py-12 max-w-5xl mx-auto">
    <UCarousel 
      v-slot="{ item }" 
      :items="items" 
      :ui="{ 
        item: 'basis-full',
        container: 'rounded-lg',
        indicators: {
          wrapper: 'relative bottom-0 w-fit mx-auto',
          base: 'ring-1 ring-red-500',
          active: 'bg-red-500',
          inactive: 'bg-white'
        },
        arrows: {
          wrapper: 'flex items-center justify-between'
        },
      }"
      :prev-button="{
        color: 'red',
        icon: 'i-heroicons-arrow-left-20-solid',
        class: 'relative inset-0 top-8'
      }"
      :next-button="{
        color: 'red',
        icon: 'i-heroicons-arrow-right-20-solid',
        class: 'relative inset-0 top-8'
      }"
      indicators
      arrows>
      <img 
        :src="item.image" 
        class="w-full" 
        draggable="false">
    </UCarousel>
  </div>
</template>

<script setup>
  defineProps({
    items: String
  })
</script>