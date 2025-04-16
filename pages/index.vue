<template>
  <div class="p-4">
    <NuxtLink class="underline" to="/shop">Zum Shop</NuxtLink>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: 'redirect-to-shop'
  })
</script>

<style scoped>

</style>