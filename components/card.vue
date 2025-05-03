<template>
  <div class="relative rounded-md overflow-hidden text-center shadow-md md:md:hover:scale-105 duration-200 ease-in-out">
    <div class="grid grid-cols-2 gap-4 items-center p-4">
      <img class="block w-56 h-56 object-contain" 
        :src="product.image" alt="">
      <span class="absolute top-4 right-4 bg-prime text-white rounded-sm px-3 py-1.5">
        {{ product.category }}
      </span>
      <span>
        {{ product.title }}
      </span>
    </div>
    <span class="block py-2">Price: {{ formatPrice(product.price) }}€</span>
  </div>
</template>

<script setup>
  defineProps({
    product: Object
  })
</script>

<style scoped>

</style>