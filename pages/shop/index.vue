<template>
  <div class="p-4 md:p-6 container space-y-4">
    <selectCategory />
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 ">
      <NuxtLink 
        v-for="product in store.filteredProducts" 
        :key="product.id"
        :to="`/shop/${product.id}`">
        <card :product="product" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from "/store/store";
  const store = useStore();

  onMounted(() => {
    store.fetchProducts();
  });
</script>

<style scoped>

</style>